import quickfix as fix

from model.ExecResult import ExecResult


class MessagesNormalizer:
  def parse(self, message):
    result = ExecResult()
    msgType = message.getHeader().getField(fix.MsgType().getField())  # getting message's type
    if msgType == fix.MsgType_RequestForPositionsAck:
      result = self.processPositionRequestAck(message)
    if msgType == fix.MsgType_PositionReport:
      result = self.processPositionReport(message)
    if msgType == fix.MsgType_ExecutionReport:
      result = self.processExecutionReport(message)
    if msgType == fix.MsgType_OrderCancelReject:
      result = self.processOrderCancelReject(message)
    return result

  def processPositionRequestAck(self, message):
    result = ExecResult()
    positionRequestRes = message.getField(fix.PosReqResult().getTag())
    if str(positionRequestRes) != str(fix.PosReqResult_VALID_REQUEST):
      errorType = ""
      if positionRequestRes == fix.PosReqResult_INVALID_OR_UNSUPPORTED_REQUEST:
        errorType = "Invalid of unsupported request"
      elif positionRequestRes == fix.PosReqResult_NO_POSITIONS_FOUND_THAT_MATCH_CRITERIA:
        errorType = "No positions"
      elif positionRequestRes == fix.PosReqResult_NOT_AUTHORIZED_TO_REQUEST_POSITIONS:
        errorType = "Not authorized"
      result.success = False
      result.message = "[XTRD] Unable to get positions. Reason: %s" % errorType
    else:
      positionsCount = message.getField(fix.TotalNumPosReports().getTag())
      result.success = True
      result.message = "[XTRD] Positions request succeed. Positions found: %s" % positionsCount
    return result

  def processPositionReport(self, message):
    result = ExecResult()
    asset = message.getField(fix.Symbol().getTag())
    exchange = ""
    for i in range(1, int(message.getField(fix.NoPartyIDs().getTag())) + 1):
      role = message.getGroupPtr(i, fix.NoPartyIDs().getTag()).getField(fix.PartyRole().getTag())
      if str(role) == str(fix.PartyRole_EXCHANGE):
        exchange = message.getGroupPtr(i, fix.NoPartyIDs().getTag()).getField(fix.PartyID().getTag())
    noPosGroup = message.getGroupPtr(1, fix.NoPositions().getTag())
    if noPosGroup.isSetField(fix.LongQty().getTag()):
      size = noPosGroup.getField(fix.LongQty().getTag())
    else:
      size = noPosGroup.getField(fix.ShortQty().getTag())
    type = message.getField(fix.SecurityType().getTag())
    result.success = True
    result.message = "[XTRD] Position found. Currency: %s. Exchange: %s. Size: %s. Type: %s." % (
      asset, exchange, size, type)
    return result

  def processExecutionReport(self, message):
    clientOrderId = message.getField(fix.ClOrdID().getTag())
    xtrdOrderId = message.getField(fix.OrderID().getTag())
    orderStatus = message.getField(fix.OrdStatus().getTag())
    execType = message.getField(fix.ExecType().getTag())
    result = ExecResult()
    if execType != fix.ExecType_ORDER_STATUS:
      if orderStatus != "8":
        status = ''
        if orderStatus == "A":
          status = "PENDING NEW"
        elif orderStatus == "0":
          status = "NEW"
        elif orderStatus == "1":
          status = "PARTIALLY FILLED"
        elif orderStatus == "2":
          status = "FILLED"
        elif orderStatus == "4":
          status = "CANCELED"
        result.success = True
        result.message = "[XTRD] Order with ID: %s (%s) changed status to %s" % (clientOrderId, xtrdOrderId, status)
      else:
        reason = message.getField(fix.Text().getTag())
        result.success = False
        result.message = "[XTRD] Order with ID: %s (%s) changed status to REJECTED. Reason: %s" % (
          clientOrderId, xtrdOrderId, reason)
    else:
      areOpenOrders = message.isSetField(fix.Text().getTag())
      if areOpenOrders == False:
        orderID = message.getField(fix.OrderID().getTag())
        clOrderID = message.getField(fix.ClOrdID().getTag())
        result.success = True
        result.message = "[XTRD] You have open order with IDs: %s (%s)" % (orderID, clOrderID)
      else:
        text = message.getField(fix.Text().getTag())
        result.success = False
        result.message = "[XTRD] Unable to get open orders. Reason: %s" % text
    return result

  def processOrderCancelReject(self, message):
    orderID = message.getField(fix.OrderID().getTag())
    origClOrderID = message.getField(fix.OrigClOrdID().getTag())
    rejReasonCode = message.getField(fix.CxlRejReason().getTag())
    rejReason = "undefined"
    if rejReasonCode == fix.CxlRejReason_TOO_LATE_TO_CANCEL:
      rejReason = "Too late to cancel"
    if rejReasonCode == fix.CxlRejReason_UNKNOWN_ORDER:
      rejReason = "Unknown order"
    if rejReasonCode == fix.CxlRejReason_BROKER_OPTION:
      rejReason = "Broker/Exchange option"
    if rejReasonCode == fix.CxlRejReason_OTHER:
      rejReason = "Other"
    result = ExecResult()
    result.success = False
    result.message = "[XTRD] Unable to cancel order %s (%s). Reason: (%s)" % (orderID, origClOrderID, rejReason)
    return result
