var EntityInfo=function(){var a=function(){var a=frames[0].Xrm.Page.data.entity,b=a.getId().replace("{","").replace("}",""),c=a.getEntityName();alert("Entity type: "+c+"\nEntity id: "+b)};return{copy:a}}();EntityInfo.copy();