package org.example.server.controlller;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.Relation;
import org.example.server.entity.User;
import org.example.server.entity.WordBase;
import org.example.server.mapper.WordBaseMapper;
import org.example.server.model.ResponseModel;
import org.example.server.model.WordBaseModel;
import org.example.server.service.UserService;
import org.example.server.service.WordBaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class WordController {
    private final UserService userService;
    private final WordBaseMapper wordBaseMapper;
    private final WordBaseService wordBaseService;
    @GetMapping("/wordbases")
    public ResponseEntity<ResponseModel> getWordBases(@RequestHeader(name = "Authorization") String header){
        User user = userService.getUserByHeader(header);
        List<WordBase> wordBases = user.getWordBases();
        System.out.println("wb"+wordBases.size());
        List<WordBaseModel> wordBaseModels = wordBaseMapper.toModels(wordBases);
        return ResponseEntity.ok(ResponseModel.builder()
                .data(wordBaseModels)
                .build());
    }
    @PostMapping("/wordbase")
    public ResponseEntity<ResponseModel> addWordBase(@RequestHeader(name = "Authorization") String header,
                                                     @RequestBody WordBaseModel wordBaseModel){
        User user = userService.getUserByHeader(header);
        WordBase wordBase = wordBaseMapper.toEntity(wordBaseModel);
        wordBase.setUser(user);
        for(Relation relation: wordBase.getRelations()){
            relation.setWordBase(wordBase);
        }
        wordBaseService.saveWordBase(wordBase);
        return ResponseEntity.ok(ResponseModel.builder()
                .data(wordBaseMapper.toModel(wordBase))
                .build());
    }
}
