package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.Relation;
import org.example.server.entity.WordBase;
import org.example.server.model.WordBaseModel;
import org.example.server.repository.RelationRepository;
import org.example.server.repository.WordBaseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WordBaseService {
    private final WordBaseRepository wordBaseRepository;
    private final RelationRepository relationRepository;
    public void saveWordBase(WordBase wordBase) {
        wordBaseRepository.save(wordBase);
        relationRepository.saveAll(wordBase.getRelations());
    }
    public WordBase addRelation(WordBase wordBase,String word, String meaning){
        int number = wordBase.getRelations().size()+1;
        Relation relation = Relation.builder()
                .word(word)
                .meaning(meaning)
                .wordBase(wordBase)
                .number(number)
                .build();
        wordBase.getRelations().add(relation);
        wordBaseRepository.save(wordBase);
        relationRepository.save(relation);
        return wordBase;
    }
    public boolean doesWordBaseExist(String name, Long userId){
        return wordBaseRepository.existsByNameAndUserId(name, userId);
    }
    public Relation editRelation(Relation relation, String word, String meaning){
        relation.setWord(word);
        relation.setMeaning(meaning);
        relationRepository.save(relation);
        return relation;
    }

    public void deleteRelation(Relation relation) {
        int number = relation.getNumber();
        relationRepository.delete(relation);
        WordBase wordBase = wordBaseRepository.findById(relation.getWordBase().getId()).orElse(null);
        if (wordBase == null){
            return;
        }
        wordBase.getRelations().remove(relation);
        wordBase.getRelations().stream()
                .filter(r -> r.getNumber() > number)
                .forEach(r -> r.setNumber(r.getNumber()-1));
        wordBaseRepository.save(wordBase);
    }

    public void deleteWordBase(WordBase wordBase) {
        relationRepository.deleteAll(wordBase.getRelations());
        wordBaseRepository.delete(wordBase);
    }
    public List<String> getWordBasesNames(Long userId){
        return wordBaseRepository.findNamesByUserId(userId);
    }
}
