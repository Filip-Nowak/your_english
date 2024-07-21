package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.Relation;
import org.example.server.entity.WordBase;
import org.example.server.model.RelationModel;
import org.example.server.security.SessionData;
import org.example.server.security.UserSession;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PracticeService {
    private final WordBaseService wordBaseService;
    public List<RelationModel> getFlashcards(UserSession userSession, List<WordBase> wordBaseList, int page,boolean newSet) {
        SessionData sessionData = userSession.getData();
        if(sessionData!=null &&areVersionsDifferent(sessionData.getVersions(), wordBaseList)){
            throw new RuntimeException("Word base has been updated");
        }
        if (newSet||sessionData == null) {
            sessionData = generateSessionData(wordBaseList);
            userSession.setData(sessionData);
        }
        int startIndex = page * 20;
        if(startIndex >= sessionData.getRelationIds().size()){
            return new LinkedList<>();
        }
        List<RelationModel> relationModels = new LinkedList<>();
        for (int i = startIndex; i < startIndex + 20; i++) {
            if (i >= sessionData.getRelationIds().size()) {
                break;
            }
            Relation relation = wordBaseService.getRelationById(sessionData.getRelationIds().get(i));
            relationModels.add(RelationModel.builder()
                    .word(relation.getWord())
                    .meaning(relation.getMeaning())
                    .build());
        }
        return relationModels;
    }

    private boolean areVersionsDifferent(List<Long> versions, List<WordBase> wordBaseList) {
        for(int i=0;i<versions.size();i++){
            if(versions.get(i) != wordBaseList.get(i).getVersion()){
                return true;
            }
        }
        return false;
    }

    private SessionData generateSessionData(List<WordBase> wordBaseList) {
        wordBaseList = sortAlphabetically(wordBaseList);
        List<Long> wordBaseIds = wordBaseList.stream().map(WordBase::getId).toList();
        List<Long> relationIds = new LinkedList<>();
        for (WordBase wordBase : wordBaseList) {
            relationIds.addAll(wordBase.getRelations().stream().map(Relation::getId).toList());
        }
        relationIds = scramble(relationIds);
        List<Long> versions = wordBaseList.stream().map(WordBase::getVersion).toList();
        return SessionData.builder()
                .wordBaseIds(wordBaseIds)
                .relationIds(relationIds)
                .versions(versions)
                .build();
    }

    private List<Long> scramble(List<Long> relationIds) {
        List<Long> scrambled = new LinkedList<>();
        while (!relationIds.isEmpty()) {
            int index = (int) (Math.random() * relationIds.size());
            scrambled.add(relationIds.get(index));
            relationIds.remove(index);
        }
        return scrambled;
    }

    private List<WordBase> sortAlphabetically(List<WordBase> wordBaseList) {
        return wordBaseList.stream().sorted(Comparator.comparing(WordBase::getName)).collect(Collectors.toList());
    }
}
