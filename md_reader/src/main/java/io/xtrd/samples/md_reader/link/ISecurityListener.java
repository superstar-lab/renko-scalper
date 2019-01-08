package io.xtrd.samples.md_reader.link;

import io.xtrd.samples.md_reader.Symbol;

@FunctionalInterface
public interface ISecurityListener {
    void onSecurityReceived(Symbol symbol, boolean last);
}
