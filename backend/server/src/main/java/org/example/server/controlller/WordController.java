package org.example.server.controlller;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.Relation;
import org.example.server.entity.User;
import org.example.server.entity.WordBase;
import org.example.server.mapper.WordBaseMapper;
import org.example.server.model.AddRelationModel;
import org.example.server.model.ResponseModel;
import org.example.server.model.WordBaseModel;
import org.example.server.service.UserService;
import org.example.server.service.WordBaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin
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
        if (wordBaseService.doesWordBaseExist(wordBaseModel.getName(), user.getId())){
            return ResponseEntity.badRequest().body(ResponseModel.builder()
                    .message("WordBase with this name already exists")
                    .build());
        }
        WordBase wordBase = WordBase.builder().user(user).name(wordBaseModel.getName()).relations(new LinkedList<>()).build();
        wordBaseService.saveWordBase(wordBase);
        return ResponseEntity.ok(ResponseModel.builder()
                .data(wordBaseMapper.toModel(wordBase))
                .build());
    }
    @PostMapping("/wordbase/{name}/relation")
    public ResponseEntity<ResponseModel> addRelation(@RequestHeader(name = "Authorization") String header,
                                                     @RequestBody AddRelationModel addRelationModel,
                                                        @PathVariable String name){
        User user = userService.getUserByHeader(header);
        WordBase wordBase = user.getWordBases().stream()
                .filter(wb -> wb.getName().equals(name))
                .findFirst()
                .orElse(null);
        if(wordBase == null){
            return ResponseEntity.badRequest().body(ResponseModel.builder()
                    .message("WordBase with this name does not exist")
                    .error(true)
                    .build());
        }
        wordBase = wordBaseService.addRelation(wordBase, addRelationModel.getWord(), addRelationModel.getMeaning());
        return ResponseEntity.ok(ResponseModel.builder()
                .data(wordBaseMapper.toModel(wordBase))
                .build());
    }
    @PutMapping("/wordbase/{name}/relation/{number}")
    public ResponseEntity<ResponseModel> editRelation(@RequestHeader(name = "Authorization") String header,
                                                      @RequestBody AddRelationModel addRelationModel,
                                                      @PathVariable String name,
                                                      @PathVariable int number){
        User user = userService.getUserByHeader(header);
        WordBase wordBase = user.getWordBases().stream()
                .filter(wb -> wb.getName().equals(name))
                .findFirst()
                .orElse(null);
        if(wordBase == null){
            return ResponseEntity.badRequest().body(ResponseModel.builder()
                    .message("WordBase with this name does not exist")
                    .error(true)
                    .build());
        }
        Relation relation = wordBase.getRelations().stream()
                .filter(r -> r.getNumber()==number)
                .findFirst()
                .orElse(null);
        if(relation == null){
            return ResponseEntity.badRequest().body(ResponseModel.builder()
                    .message("Relation with this number does not exist")
                    .error(true)
                    .build());
        }
        relation = wordBaseService.editRelation(relation, addRelationModel.getWord(), addRelationModel.getMeaning());
        return ResponseEntity.ok(ResponseModel.builder()
                .data(wordBaseMapper.toModel(wordBase))
                .build());
    }
    @DeleteMapping("/wordbase/{name}/relation/{number}")
    public ResponseEntity<ResponseModel> deleteRelation(@RequestHeader(name = "Authorization") String header,
                                                        @PathVariable String name,
                                                        @PathVariable int number){
        User user = userService.getUserByHeader(header);
        WordBase wordBase = user.getWordBases().stream()
                .filter(wb -> wb.getName().equals(name))
                .findFirst()
                .orElse(null);
        if(wordBase == null){
            return ResponseEntity.badRequest().body(ResponseModel.builder()
                    .message("WordBase with this name does not exist")
                    .error(true)
                    .build());
        }
        Relation relation = wordBase.getRelations().stream()
                .filter(r -> r.getNumber()==number)
                .findFirst()
                .orElse(null);
        if(relation == null){
            return ResponseEntity.badRequest().body(ResponseModel.builder()
                    .message("Relation with this number does not exist")
                    .error(true)
                    .build());
        }
        wordBaseService.deleteRelation(relation);
        return ResponseEntity.ok(ResponseModel.builder()
                .data(wordBaseMapper.toModel(wordBase))
                .build());
    }
    @DeleteMapping("/wordbase/{name}")
    public ResponseEntity<ResponseModel> deleteWordBase(@RequestHeader(name = "Authorization") String header,
                                                        @PathVariable String name){
        User user = userService.getUserByHeader(header);
        WordBase wordBase = user.getWordBases().stream()
                .filter(wb -> wb.getName().equals(name))
                .findFirst()
                .orElse(null);
        if(wordBase == null){
            return ResponseEntity.badRequest().body(ResponseModel.builder()
                    .message("WordBase with this name does not exist")
                    .error(true)
                    .build());
        }
        wordBaseService.deleteWordBase(wordBase);
        user.getWordBases().remove(wordBase);
        userService.saveUser(user);
        return ResponseEntity.ok(ResponseModel.builder()
                .message("WordBase deleted")
                .build());
    }
}
