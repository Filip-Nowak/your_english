package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.User;
import org.example.server.repository.UserRepository;
import org.example.server.security.JwtService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    public User getUserByHeader(String header) {
        String email = jwtService.extractUserEmail(header.substring(7));
        return userRepository.findByEmail(email).orElse(null);
    }
}
