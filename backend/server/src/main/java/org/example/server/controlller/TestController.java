package org.example.server.controlller;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Request;
import org.example.server.service.UserService;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@CrossOrigin
@org.springframework.web.bind.annotation.RestController
public class TestController {
    private final UserService userService;
    @GetMapping("/api/test/test")
    public String test() {
        return "test";
    }
    @GetMapping("/api/sec")
    public String sec() {
        return "secured data";
    }
    @GetMapping("/api/email")
    public String email(@RequestHeader(name = "Authorization") String header) {
        return userService.getUserByHeader(header).getEmail();
    }
}
