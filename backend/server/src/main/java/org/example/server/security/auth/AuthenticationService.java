package org.example.server.security.auth;


import lombok.RequiredArgsConstructor;
import org.example.server.entity.User;
import org.example.server.model.RegisterResponse;
import org.example.server.repository.UserRepository;
import org.example.server.security.JwtService;
import org.example.server.service.EmailSendingService;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSendingService emailSendingService;
    public RegisterResponse register(RegisterRequest request) throws RuntimeException{
        if(userRepository.existsByEmail(request.getEmail())){
            System.out.println("Email already exists");
            throw new RuntimeException("Email already exists");
        }
        System.out.println("Registering");
        var user= User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .build();
        userRepository.save(user);
        String token=UUID.randomUUID().toString();
        ConfirmationToken confirmationToken=ConfirmationToken.builder()
                .token(token)
                .user(user)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();
        confirmationTokenService.saveConfirmationToken(confirmationToken);
//        var jwtToken=jwtService.generateToken(user);
        emailSendingService.send(request.getEmail(), "go to http://localhost:8080/api/auth/confirm?token="+token+" to confirm your email");
        return RegisterResponse.builder()
                .errors(null)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        if(!userRepository.existsByEmail(request.getEmail())){
            System.out.println("User not found");
            throw new RuntimeException("User not found");
        }
        try{
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        }catch (Exception e){
            System.out.println("exception "+e.getMessage());
            throw new RuntimeException("Invalid credentials");
        }
        var user=userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken=jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        User user = confirmationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        return "confirmed";
    }
}
