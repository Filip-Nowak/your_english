package org.example.server.controlller;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.User;
import org.example.server.model.ResponseModel;
import org.example.server.model.UserData;
import org.example.server.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService userService;
    @GetMapping("/api/user")
    public ResponseEntity<ResponseModel> getUser(@RequestHeader(name = "Authorization") String header) {
        User user = userService.getUserByHeader(header);
        return ResponseEntity.ok(ResponseModel.builder()
                .data(UserData.builder()
                        .name(user.getName())
                        .email(user.getEmail())
                        .build())
                .build());
    }
}
