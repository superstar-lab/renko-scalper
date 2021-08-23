import atexit

import quickfix
from quickfix import ConfigError, FileLogFactory, SocketInitiator, RuntimeError, FileStoreFactory, SessionSettings
import sys
from application import Application
import argparse


def main():
  try:
    config = SessionSettings("config.cfg")
    application = Application()
    store = FileStoreFactory(config)
    logs = FileLogFactory(config)
    initiator = SocketInitiator(application, store, config, logs)
    atexit.register(initiator.stop)
    initiator.start()
    application.run()
    # initiator.stop()
  except (ConfigError, RuntimeError) as e:
    print(e)
    initiator.stop()
    sys.exit()


main()
