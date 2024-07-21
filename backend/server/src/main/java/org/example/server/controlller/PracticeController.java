package org.example.server.controlller;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.User;
import org.example.server.entity.WordBase;
import org.example.server.model.RelationModel;
import org.example.server.model.ResponseModel;
import org.example.server.security.UserSession;
import org.example.server.service.PracticeService;
import org.example.server.service.UserService;
import org.example.server.service.WordBaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/practice")
public class PracticeController {
    private final PracticeService practiceService;
    private final UserService userService;
    private final WordBaseService wordBaseService;
    private final UserSession userSession;

    @GetMapping("/flashcards")
    public ResponseEntity<ResponseModel> getFlashcards(@RequestHeader(name = "Authorization") String header, @RequestParam() int page, @RequestParam List<String> w,@RequestParam(required = false) boolean newSet) {
        try {
            User user = userService.getUserByHeader(header);
            if(page<0){
                throw new RuntimeException("Page number must be greater than or equal to 0");
            }
            List<WordBase> wordBaseList=new LinkedList<>();
            for(String s:w){
                wordBaseList.add(wordBaseService.getWordBaseByName(s,user.getId()));
            }
            List<RelationModel> relationModels = practiceService.getFlashcards(userSession,wordBaseList, page,newSet);
            if(relationModels.isEmpty()){
                throw new RuntimeException("No more flashcards");
            }
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(false)
                    .data(relationModels)
                    .build());
        } catch (RuntimeException e) {
            return ResponseEntity.ok(ResponseModel.builder()
                    .error(true)
                    .message(e.getMessage())
                    .build());
        }
    }
}
