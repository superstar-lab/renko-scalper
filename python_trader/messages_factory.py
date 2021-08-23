import random
import quickfix as fix
import quickfix44 as fix44  # is needed to use predefined message classes
import configparser
from datetime import datetime

cfgparser = configparser.ConfigParser()  # creating new config parser
cfgparser.read("config.cfg")  # reading config file


class MessagesFactory:
  def NewOrderSingleMessage(self, symbol, size, price, exchange, side):
    message = fix44.NewOrderSingle()
    header = message.getHeader()
    header.setField(fix.MsgType(fix.MsgType_NewOrderSingle))
    message.setField(fix.Account(cfgparser.get("SESSION", "Account")))
    message.setField(fix.ClOrdID(self.genExecID()))
    message.setField(fix.OrderQty(size))
    message.setField(fix.OrdType(fix.OrdType_LIMIT))
    message.setField(fix.Price(price))
    message.setField(fix.Side(side))
    message.setField(fix.Symbol(symbol))
    message.setField(fix.TimeInForce(fix.TimeInForce_GOOD_TILL_CANCEL))
    trstime = fix.TransactTime()
    trstime.setString(datetime.utcnow().strftime("%Y%m%d-%H:%M:%S.%f")[:-3])
    message.setField(trstime)
    message.setField(fix.ExDestination(exchange))
    message.setField(fix.SecurityType("CRYPTOSPOT"))
    return message

  def cancelOrderMessage(self, orderID, clOrderID, symbol):
    message = fix44.OrderCancelRequest()
    header = message.getHeader()
    header.setField(fix.MsgType(fix.MsgType_OrderCancelRequest))
    message.setField(fix.Account(cfgparser.get("SESSION", "Account")))
    message.setField(fix.ClOrdID(self.genExecID()))
    message.setField(fix.OrderID(orderID))
    message.setField(fix.OrigClOrdID(clOrderID))
    message.setField(fix.Side(fix.Side_BUY))
    message.setField(fix.Symbol(symbol))
    trstime = fix.TransactTime()
    trstime.setString(datetime.utcnow().strftime("%Y%m%d-%H:%M:%S.%f")[:-3])
    message.setField(trstime)
    return message

  def PositionsMessage(self):
    message = fix.Message()
    header = message.getHeader()
    header.setField(fix.MsgType(fix.MsgType_RequestForPositions))
    message.setField(fix.PosReqID(self.genExecID()))
    message.setField(fix.PosReqType(fix.PosReqType_POSITIONS))
    message.setField(fix.SubscriptionRequestType(fix.SubscriptionRequestType_SNAPSHOT_PLUS_UPDATES))
    message.setField(fix.Account(cfgparser.get("SESSION", "Account")))
    message.setField(fix.AccountType(fix.AccountType_ACCOUNT_IS_CARRIED_ON_CUSTOMER_SIDE_OF_BOOKS))
    cbDate = fix.ClearingBusinessDate()
    cbDate.setString(datetime.utcnow().strftime("%Y%m%d"))
    message.setField(cbDate)
    noPartyIDs = fix44.RequestForPositions().NoPartyIDs()
    noPartyIDs.setField(fix.PartyID(str(cfgparser.get("SESSION", "Account"))))
    noPartyIDs.setField(fix.PartyRole(fix.PartyRole_ORDER_ORIGINATION_TRADER))
    message.addGroup(noPartyIDs)
    trstime = fix.TransactTime()
    trstime.setString(datetime.utcnow().strftime("%Y%m%d-%H:%M:%S.%f")[:-3])
    message.setField(trstime)
    return message

  def orderMassStatusRequestMessage(self):
    message = fix44.OrderMassStatusRequest()
    header = message.getHeader()
    header.setField(fix.MsgType(fix.MsgType_OrderMassStatusRequest))
    message.setField(fix.MassStatusReqID(self.genExecID()))
    message.setField(fix.MassStatusReqType(fix.MassStatusReqType_STATUS_FOR_ORDERS_FOR_A_PARTYID))
    group = fix44.OrderMassStatusRequest().NoPartyIDs();
    group.setField(fix.PartyID(cfgparser.get("SESSION", "Account")))
    group.setField((fix.PartyRole(fix.PartyRole_ORDER_ORIGINATION_TRADER)))
    message.addGroup(group)
    return message

  def genExecID(self):  # generating unique ID for every message
    reqID = random.randint(1, 10000000)
    return str(reqID)
