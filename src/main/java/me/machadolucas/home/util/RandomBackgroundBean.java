package me.machadolucas.home.util;

import javax.annotation.PostConstruct;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@ApplicationScoped
@ManagedBean
public class RandomBackgroundBean {

    private List<String> photos = new ArrayList<String>();

    @ManagedProperty("#{photographyBean}")
    private PhotographyBean photographyBean;

    @PostConstruct
    public void init() {
        photos.addAll(photographyBean.getPhotos());
    }

    public String getRandomPhoto() {
        return photos.get(ThreadLocalRandom.current().nextInt(photos.size()));
    }

    public PhotographyBean getPhotographyBean() {
        return photographyBean;
    }

    public void setPhotographyBean(PhotographyBean photographyBean) {
        this.photographyBean = photographyBean;
    }
}
