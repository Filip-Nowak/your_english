package org.example.server;

import org.example.server.entity.User;
import org.example.server.entity.WordBase;
import org.example.server.security.auth.AuthenticationService;
import org.example.server.security.auth.RegisterRequest;
import org.example.server.service.UserService;
import org.example.server.service.WordBaseService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.LinkedList;

@SpringBootApplication
public class ServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(UserService userService, WordBaseService wordBaseService, AuthenticationService authenticationService) {
        return (args) -> {
            fillSongs(userService, wordBaseService, authenticationService);
        };
    }

    private void fillSongs(UserService userService, WordBaseService wordBaseService, AuthenticationService authenticationService) {
//        authenticationService.register(RegisterRequest.builder()
//                .email("xd@xd")
//                .name("xd")
//                .password("asdfasdf")
//                .build());
//        User user = userService.getUserByEmail("xd@xd");
//        WordBase wordBase = WordBase.builder()
//                .name("my wordbase")
//                .relations(new LinkedList<>())
//                .user(user).build();
//        wordBaseService.saveWordBase(wordBase);
//        for (int i = 0; i < 25; i++) {
//            wordBaseService.addRelation(wordBase, "word" + i, "meaning" + i);
//        }
//        WordBase wordBase2 = WordBase.builder()
//                .name("my wordbase2")
//                .relations(new LinkedList<>())
//                .user(user).build();
//        wordBaseService.saveWordBase(wordBase2);
//        for (int i = 0; i < 100; i++) {
//            wordBaseService.addRelation(wordBase2, "wordxd" + i, "meaningxd" + i);
//        }
    }
}
