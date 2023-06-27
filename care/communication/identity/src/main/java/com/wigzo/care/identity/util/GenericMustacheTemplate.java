package com.wigzo.care.identity.util;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import org.springframework.stereotype.Component;

import java.io.StringReader;
import java.io.StringWriter;
import java.util.Map;

@Component
public final class GenericMustacheTemplate {


    public static <K, V> StringBuilder compileUsingMustache(String template, Map<K, V> map) {
        StringWriter stringWriter = new StringWriter();
        MustacheFactory mf = new DefaultMustacheFactory();
        Mustache mustache = mf.compile(new StringReader(template), "example");
        mustache.execute(stringWriter, map);
        return new StringBuilder(stringWriter.toString());
    }

    private GenericMustacheTemplate() {

    }
}
