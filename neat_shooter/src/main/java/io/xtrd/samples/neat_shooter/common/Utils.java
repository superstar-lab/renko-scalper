package io.xtrd.samples.neat_shooter.common;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;

public class Utils {
    public static DateTime getTimestamp() {
        return new DateTime().withZone(DateTimeZone.UTC);
    }
}
