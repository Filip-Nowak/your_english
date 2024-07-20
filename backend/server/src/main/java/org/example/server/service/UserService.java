package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.User;
import org.example.server.entity.WordBase;
import org.example.server.repository.UserRepository;
import org.example.server.security.JwtService;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    public User getUserByHeader(String header) {
        String email = jwtService.extractUserEmail(header.substring(7));
        return userRepository.findByEmail(email).orElse(null);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }


    public User getUserByEmail(String s) {
        return userRepository.findByEmail(s).orElse(null);
    }
}
