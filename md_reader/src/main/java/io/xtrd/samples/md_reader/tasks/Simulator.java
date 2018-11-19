package io.xtrd.samples.md_reader.tasks;

public class Simulator {
    public static long getDelay(long baseDelay, long minDelay, long maxDelay) {
        return baseDelay + (long) (Math.random() * ((maxDelay - minDelay) + 1));
    }
}
