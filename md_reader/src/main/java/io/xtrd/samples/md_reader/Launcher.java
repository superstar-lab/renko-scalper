package io.xtrd.samples.md_reader;

public class Launcher {
    private static Core core;

    public static void main(String []args) throws Exception {
        if(args.length == 0) throw new IllegalArgumentException("No config provided");

        core = new Core();
        core.init(args[0]);
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            if(core != null) core.stop();
        }));

        core.start();

        while(true) {
            Thread.sleep(1000);
        }
    }
}
