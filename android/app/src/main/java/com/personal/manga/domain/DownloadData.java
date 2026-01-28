package com.personal.manga.domain;

public class DownloadData {
    public String id;
    public String mangaId;
    public String name;
    public int progress;
    public String status;
    public String source;
    public String error;

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getMangaId() { return mangaId; }
    public void setMangaId(String mangaId) { this.mangaId = mangaId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getProgress() { return progress; }
    public void setProgress(int progress) { this.progress = progress; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}
