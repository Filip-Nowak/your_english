package org.example.server.controlller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.server.model.RegisterResponse;
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
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        RegisterResponse response;
        try {
            response = authenticationService.register(request);
        } catch (RuntimeException e) {
            return ResponseEntity.ok(RegisterResponse.builder()
                    .errors(e.getMessage())
                    .build());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody @Valid AuthenticationRequest request
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
    @GetMapping("/test")
    public ResponseEntity<ResponseModel> test(){
        return ResponseEntity.ok(ResponseModel.builder()
                .message("test success")
                .build());
    }
    @GetMapping("/confirm")
    public ResponseModel confirm(@RequestParam("token") String token) {
       try{
           authenticationService.confirmToken(token);
              return ResponseModel.builder()

                     .build();
       }catch (RuntimeException e){
           return ResponseModel.builder()
                   .error(true)
                   .message(e.getMessage())
                   .build();
       }
    }

}
