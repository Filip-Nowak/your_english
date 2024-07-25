package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.entity.Relation;
import org.example.server.entity.WordBase;
import org.example.server.model.ChoiceModel;
import org.example.server.model.RelationModel;
import org.example.server.security.SessionData;
import org.example.server.security.UserSession;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PracticeService {
    private final WordBaseService wordBaseService;

    public List<RelationModel> getFlashcards(UserSession userSession, List<WordBase> wordBaseList, int page, boolean newSet) throws RuntimeException {
        SessionData sessionData = getSessionData(userSession.getData(), userSession, wordBaseList, newSet);
        int startIndex = page * 20;
        if (startIndex >= sessionData.getRelationIds().size()) {
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

    private boolean areTheSameSet(List<Long> wordBaseIds, List<WordBase> wordBaseList) {
        if (wordBaseIds.size() != wordBaseList.size()) {
            return false;
        }
        wordBaseList = sortAlphabetically(wordBaseList);
        for (int i = 0; i < wordBaseIds.size(); i++) {
            if (!Objects.equals(wordBaseIds.get(i), wordBaseList.get(i).getId())) {
                return false;
            }
        }
        return true;
    }

    private boolean areVersionsDifferent(List<Long> versions, List<WordBase> wordBaseList) {
        for (int i = 0; i < versions.size(); i++) {
            if (versions.get(i) != wordBaseList.get(i).getVersion()) {
                return true;
            }
        }
        return false;
    }

    private SessionData getSessionData(SessionData sessionData, UserSession userSession, List<WordBase> wordBaseList, boolean newSet) {
        if (sessionData == null || newSet || !areTheSameSet(sessionData.getWordBaseIds(), wordBaseList)) {
            sessionData = generateSessionData(wordBaseList);
            userSession.setData(sessionData);
        } else {
            if (areVersionsDifferent(sessionData.getVersions(), wordBaseList)) {
                throw new RuntimeException("Word bases have been modified");
            }
        }
        return sessionData;
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


    public List<ChoiceModel> getChoice(List<WordBase> wordBaseList) {
        List<Relation> relations = getRelations(wordBaseList);
        List<ChoiceModel> choiceModels = new LinkedList<>();
        for (Relation relation : relations) {
            boolean language = Math.random() < 0.5;
            ChoiceModel choiceModel = new ChoiceModel();
            choiceModel.setWord(language ? relation.getWord() : relation.getMeaning());
            List<String> meanings = new LinkedList<>();
            meanings.add(language ? relation.getMeaning() : relation.getWord());
            for (int i = 0; i < 3; i++) {
                List<Relation> wordBaseRelations = relation.getWordBase().getRelations();
                Relation randomRelation = wordBaseRelations.get((int) (Math.random() * wordBaseRelations.size()));
                meanings.add(language ? randomRelation.getMeaning() : randomRelation.getWord());
            }
            choiceModel.setMeanings(meanings);
            choiceModels.add(choiceModel);
        }
        return choiceModels;
    }

    private List<Relation> getRelations(List<WordBase> wordBaseList) {
        List<Relation> relations = new LinkedList<>();
        for (WordBase wordBase : wordBaseList) {
            relations.addAll(wordBase.getRelations());
        }
        List<Relation> output = new LinkedList<>();
        for (int i = 0; i < 20; i++) {
            int index = (int) (Math.random() * relations.size());
            output.add(relations.get(index));
            relations.remove(index);
        }
        return output;
    }

    public List<List<RelationModel>> getConnect(List<WordBase> wordBaseList) {
        List<Relation> relations = getRelations(wordBaseList);
        List<List<RelationModel>> connectList = new LinkedList<>();
        for (int i = 0; i < 4; i++) {
            List<RelationModel> relationModels = new LinkedList<>();
            for (int j = 0; j < 5; j++) {
                int index = (int) (Math.random() * relations.size());
                Relation relation = relations.get(index);
                relationModels.add(RelationModel.builder()
                        .word(relation.getWord())
                        .meaning(relation.getMeaning())
                        .build());
                relations.remove(index);
            }
            connectList.add(relationModels);
        }
        return connectList;
    }

    public List<RelationModel> getInsert(List<WordBase> wordBaseList) {
        List<Relation> relations = getRelations(wordBaseList);
        List<RelationModel> relationModels = new LinkedList<>();
        for (int i = 0; i < 20; i++) {
            int index = (int) (Math.random() * relations.size());
            Relation relation = relations.get(index);
            relationModels.add(RelationModel.builder()
                    .word(relation.getWord())
                    .meaning(relation.getMeaning())
                    .build());
            relations.remove(index);
        }
        return relationModels;
    }
}
