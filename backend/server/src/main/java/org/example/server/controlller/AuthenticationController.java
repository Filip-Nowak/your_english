package org.example.server.controlller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.server.model.ResponseModel;
import org.example.server.security.auth.AuthenticationRequest;
import org.example.server.security.auth.AuthenticationResponse;
import org.example.server.security.auth.AuthenticationService;
import org.example.server.security.auth.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        AuthenticationResponse response;
        try {
            response = authenticationService.register(request);
        } catch (RuntimeException e) {
            return ResponseEntity.ok(AuthenticationResponse.builder()
                    .errors("email:Email already exists;")
                    .build());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ) {
        System.out.println("authenticating");
        AuthenticationResponse response;
        try{
            response=authenticationService.authenticate(request);
        }catch (RuntimeException e){
            return ResponseEntity.ok(AuthenticationResponse.builder()
                    .errors("wrong credentials")
                    .build());
        }
        return ResponseEntity.ok(response);

    }
    @GetMapping("/logout/success")
    public ResponseEntity<ResponseModel> logout(){
        return ResponseEntity.ok(ResponseModel.builder()
                .message("logout success")
                .build());
    }
}
