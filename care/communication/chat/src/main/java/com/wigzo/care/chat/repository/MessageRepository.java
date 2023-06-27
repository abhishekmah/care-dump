package com.wigzo.care.chat.repository;

import com.wigzo.care.chat.entity.Message;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MessageRepository extends CassandraRepository<Message, UUID> {

    Message findByOrgTokenAndUserPhoneAndMessageId(String orgToken, String userPhone, String messageId);


    Slice<Message> findByOrgTokenAndUserPhoneOrderByTimeDesc(String orgToken, String userPhone, Pageable pageable);


}
