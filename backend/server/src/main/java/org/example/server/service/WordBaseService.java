package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.Relation;
import org.example.server.entity.WordBase;
import org.example.server.model.WordBaseModel;
import org.example.server.repository.RelationRepository;
import org.example.server.repository.WordBaseRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WordBaseService {
    private final WordBaseRepository wordBaseRepository;
    private final RelationRepository relationRepository;
    public void saveWordBase(WordBase wordBase) {
        wordBaseRepository.save(wordBase);
        relationRepository.saveAll(wordBase.getRelations());
    }
}
