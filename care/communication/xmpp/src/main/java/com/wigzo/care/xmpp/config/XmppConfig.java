package com.wigzo.care.xmpp.config;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.jivesoftware.smack.AbstractXMPPConnection;
import org.jivesoftware.smack.ConnectionConfiguration;
import org.jivesoftware.smack.ConnectionListener;
import org.jivesoftware.smack.XMPPConnection;
import org.jivesoftware.smack.chat2.Chat;
import org.jivesoftware.smack.chat2.ChatManager;
import org.jivesoftware.smack.packet.Message;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jivesoftware.smack.tcp.XMPPTCPConnectionConfiguration;
import org.jxmpp.jid.EntityBareJid;
import org.jxmpp.jid.impl.JidCreate;
import org.jxmpp.stringprep.XmppStringprepException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

@Component
@Slf4j
public class XmppConfig {
    @Value("${xmpp.server.hostname}")
    private String hostname;

    @Value("${xmpp.server.doamin}")
    private String domain;

    @Value("${xmpp.server.port}")
    private int port;

    @Value("${xmpp.username}")
    private String username;

    @Value("${xmpp.password}")
    private String password;
    public static final AbstractXMPPConnection connection = new XMPPTCPConnection(getConfiguration());
    public static ChatManager chatManager;


    public void sendMessage(JsonNode xmppMessageBody) throws Exception {
        chatManager = ChatManager.getInstanceFor(connection);
        EntityBareJid jid = JidCreate.entityBareFrom("abhishek@firefly");
        Chat chat = chatManager.chatWith(jid);
        Message message = new Message();
        message.setBody(xmppMessageBody.toString());
        chat.send(message);
    }

    public static void initializeIncomingListener() {
        chatManager.addIncomingListener((EntityBareJid from, Message message, Chat chat) -> {
            System.out.println("New message from " + from + ": " + message.getBody());
        });
    }

    public static void initializeOutgoingListener() {
        chatManager.addOutgoingListener((EntityBareJid from, Message message, Chat chat) -> {
            System.out.println("New message from " + from + ": " + message.getBody());
        });
    }

    public static void initializeConnectionListener() {
        connection.addConnectionListener(new ConnectionListener() {
            @Override
            public void connected(XMPPConnection xmppConnection) {

            }

            @Override
            public void authenticated(XMPPConnection xmppConnection, boolean b) {

            }

            @Override
            public void connectionClosed() {
            }

            @Override
            public void connectionClosedOnError(Exception e) {

            }

            @Override
            public void reconnectionSuccessful() {

            }

            @Override
            public void reconnectingIn(int i) {

            }

            @Override
            public void reconnectionFailed(Exception e) {

            }
        });
    }

    @Bean
    public static void initializeXMPPConnection() throws Exception {
        /*XMPPTCPConnectionConfiguration config = XMPPTCPConnectionConfiguration.builder()
                .setHost("10.10.10.165")
                .setXmppDomain("rihan@firefly")
                .setPort(5222)
                .setUsernameAndPassword("rihan", "password")
                .setSecurityMode(ConnectionConfiguration.SecurityMode.disabled)
                .build();
        // Create the connection
        connection = new XMPPTCPConnection(config);*/
        connection.connect();
        connection.login();

    }

    private static XMPPTCPConnectionConfiguration getConfiguration() {
        try {
            return XMPPTCPConnectionConfiguration.builder()
                    .setHost("10.10.10.165")
                    .setXmppDomain("ragini@firefly")
                    .setPort(5222)
                    .setUsernameAndPassword("ragini", "password")
                    .setSecurityMode(ConnectionConfiguration.SecurityMode.disabled)
                    .build();
        } catch (XmppStringprepException e) {
            throw new RuntimeException(e);
        }
    }

//    @Bean
    public static void initializeChatManager() {
        chatManager = ChatManager.getInstanceFor(connection);
    }


}
