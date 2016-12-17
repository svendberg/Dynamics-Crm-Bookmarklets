var EntityInfo = (function () {
    var copy = function () {
        var entity = frames[0].Xrm.Page.data.entity;
        var guid = entity.getId().replace("{", "").replace("}", "");
        var name = entity.getEntityName();
        alert("Entity type: " + name + "\nEntity id: " + guid);
    };
    return {
        copy: copy
    };
})();
EntityInfo.copy();