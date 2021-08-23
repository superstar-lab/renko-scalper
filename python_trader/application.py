import configparser
import quickfix as fix
import time  # to keep system awaken until interruption
import logging

from messages_factory import MessagesFactory
from messages_normalizer import MessagesNormalizer
from model.logger import setup_logger  # logger to store fix messages

__SOH__ = chr(1)

cfgparser = configparser.ConfigParser()  # creating new config parser
cfgparser.read("config.cfg")  # reading config file

setup_logger('logfix', "Logs/message.log")  # folder that mentioned here are used to store fix logs
logfix = logging.getLogger('logfix')  # creating new logger


class Application(fix.Application):
  normalizer = MessagesNormalizer()
  factory = MessagesFactory()
  positions = {}  # dictionary {"$exchange name": [$symbols that are available to get Market Data by]
  openOrders = []

  def onCreate(self, sessionID):
    print("[XTRD] Session with ID:(%s) has successfully created" % sessionID.toString())
    return

  def onLogon(self, sessionID):
    self.sessionID = sessionID  # saving session ID, it is needed to make all requests to server
    print("[XTRD] Successful Logon from Session ID:(%s) " % sessionID.toString())
    self.getPositions()
    self.getOrderMassStatus()
    # self.cancelOrderInput()
    return

  def onLogout(self, sessionID):
    print("[XTRD] Successful Logout from Session ID:(%s) " % sessionID.toString())
    return

  def toAdmin(self, message, sessionID):
    msgType = message.getHeader().getField(fix.MsgType().getTag());
    # IMPORTANT: For Logon message Username and password should be added to header MANUALLY
    if (msgType == fix.MsgType_Logon):  # If message has type Logon (A)
      message.setField(fix.Username(cfgparser.get("SESSION", "Username")))  # Username
      message.setField(fix.Password(cfgparser.get("SESSION", "Password")))  # Password
    logfix.info("(Admin) S >> %s" % message.toString().replace(__SOH__, "|"))  # log sent Messages
    return

  def toApp(self, message, sessionID):
    print("[XTRD] Message TO_APP: %s " % message.toString().replace(__SOH__, "|"))  # print app's sent messages
    return

  def fromAdmin(self, message, sessionID):
    logfix.info("(Admin) R << %s" % message.toString().replace(__SOH__, "|"))  # log received messages
    return

  def fromApp(self, message, sessionID):
    result = self.normalizer.parse(message)
    if result.success:
      logfix.info(result.message)
    else:
      logfix.error(result.message)
    return

  def run(self):
    while 1:
      time.sleep(2)

  def placeNewOrder(self, symbol, size, price, exchange, side):
    self.sendToTarget(self.factory.NewOrderSingleMessage(symbol, size, price, exchange, side), self.sessionID)

  def sendToTarget(self, message, sessionID):  # method to send complete message to target
    fix.Session.sendToTarget(message, sessionID)

  def getPositions(self):
    self.sendToTarget(self.factory.PositionsMessage(), self.sessionID)

  def cancelOrderInput(self):
    orderID = str(input("Enter order ID, that you want to cancel: \n"))
    clOrderID = str(input("Enter client order ID: \n"))
    symbol = str(input("Enter symbol: \n"))
    self.cancelOrderRequest(orderID, clOrderID, symbol)

  def cancelOrderRequest(self, orderID, clOrderID, symbol):
    self.sendToTarget(self.factory.cancelOrderMessage(orderID, clOrderID, symbol), self.sessionID)

  def getOrderMassStatus(self):
    self.sendToTarget(self.factory.orderMassStatusRequestMessage(), self.sessionID)
