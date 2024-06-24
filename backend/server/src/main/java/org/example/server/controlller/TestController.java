package org.example.server.controlller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@RequiredArgsConstructor
@CrossOrigin
@org.springframework.web.bind.annotation.RestController
public class TestController {
    @GetMapping("/api/test/test")
    public String test() {
        return "test";
    }
    @GetMapping("/api/sec")
    public String sec() {
        return "secured data";
    }
}
