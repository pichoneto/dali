var BasicPills = (function(){
    return new Dali.Plugin({
        getConfig: function(){
            return {
                name: 'BasicPills',
                category: 'text',
                needsConfigModal: true,
                needsTextEdition: false,
                icon: 'fa-medkit'
            };
        },
        getToolbar: function(){
            return [
               /* { 
                    name: 'opacity',
                    humanName: 'Opacityewre',
                    type: 'number',
                    value: 1,
                    min: 0,
                    max: 1,
                    step: 0.1
                },
                {
                    name: 'borderSize',
                    humanName: 'Border Size',
                    type: 'number',
                    value: 0,
                    min: 0,
                    max: 10,
                    autoManaged: false,
                }*/
                ]
            },
            getSections: function(){
                return [
                    {
                        tab: 'Main', 
                        accordion: ['Basic', 'Style']
                    },
                    {
                        tab: 'Other', 
                        accordion: ['Extra']
                    },

                ];
              },
            getInitialState: function(){
                return {number: 0, titles: [], texts: [], colors: [], colorsTitle: []};
            },
            getConfigTemplate: function(state){

                var editorBox = '';
                var number = state.number;
                var auxTitles = state.titles;
                var auxTexts = state.texts;
                var auxColors = state.colors;
                var auxColorsTitle = state.colorsTitle;
                var d = new Date();
                var n = d.getTime();

                for(var i = 0; i < number ; i++){
                    if(auxTitles[i] == null){
                        auxTitles.push('title'+i);
                    }
                    if(auxTexts[i] == null){
                        auxTexts.push('text'+i); 
                    }
                    if(auxColors[i] == null){
                        auxColors.push('#f87060'); 
                    }
                    if(auxColorsTitle[i] == null){
                        auxColorsTitle.push('white');
                    }


                    editorBox += '\
                    <div class="col-xs-12 text-center"><hr><h2>Pill'+i+'</h2></div>\n\
                    <div class="col-xs-12 col-sm-6">Titulo:\n\
                    <input onchange="BasicPills.setTitle('+i+')" type="text" autofocus id="title'+i+'" value= '+ auxTitles[i] +'></div>\n\
                    <div class="col-xs-12 col-sm-3">Color título:\n\
                    <input onchange="BasicPills.setColorTitle('+i+')" type="color" name="colorTitle" id="colorT'+i+'" value="'+auxColorsTitle[i]+'"> </div>\n\
                    <div class="col-xs-12 col-sm-3">Color:\n\
                    <input onchange="BasicPills.setColor('+i+')" type="color" name="favcolor" id="color'+i+'" value="'+auxColors[i]+'"> </div>\n\
                    <div class="col-xs-12 well textEditable" onfocus="BasicPills.ponerCKEditor('+i+','+n+')" onblur="BasicPills.setText('+i+')" contentEditable id="text'+i+'">'+auxTexts[i]+'</div>';

                }

                BasicPills.setState('titles',auxTitles);
                BasicPills.setState('texts',auxTexts);
                BasicPills.setState('colors',auxColors);
                BasicPills.setState('colorsTitle',auxColorsTitle);

                return "\
                <div>Número de pestañas \n\
                <input type=\"number\" onchange='BasicPills.showPreview()' min=\"0\" autofocus id=\"BasicPills_input\" value=\"" + state.number + "\">\n\
                </div>\n\
                <div id=\"fdsf\" class='row'></div>\n\
                <div id=\"configuradores\" class=\"row\">"+editorBox+"</div>";
            },
            getRenderTemplate: function(state){
                var number = state.number;
                var auxTitles = state.titles;
                var auxTexts = state.texts;
                var auxColors = state.colors;
                var auxColorsTitle = state.colorsTitle;
                var auxNavPills = '';
                var auxTextsPills = '';

                var ancho = 12/number;
                var d = new Date();
                var n = d.getTime();
                var resto = 12%number;

                for(var i = 0; i < number ; i++){
                    if(i==0){
                        auxNavPills += '\
                        <li id="li'+n+'" style="padding:0%;color:'+auxColorsTitle[i]+'; background-color: '+auxColors[i]+';"\n\
                        class="pills col-xs-'+ ancho+' active collapsed"\n\
                        aria-controls="Text'+i+'Pill'+n+'" href="#Text'+i+'Pill'+n+'"\n\
                        aria-expanded="true" data-toggle="collapse" role="button"\n\
                        onClick="BasicPills.handleSelect('+i+','+n+','+number+')"><b>'+auxTitles[i]+'</b></li>';

                        auxTextsPills += '\
                        <div class="Pill'+n+' row collapse in" id="Text'+i+'Pill'+n+'"\n\
                        style="border:'+auxColors[i]+';border-style: solid;border-radius: 0.5em;margin-top: 1%;" >\n\
                        <p>'+auxTexts[i]+'</p>\n\
                        </div>';
                    }else{
                        auxNavPills +=  '\
                        <li class="pills col-xs-'+ancho+' collapsed"\n\
                        aria-controls="Text'+i+'Pill'+n+'" href="#Text'+i+'Pill'+n+'"\n\
                        aria-expanded="false" data-toggle="collapse" role="button"\n\
                        style="padding:0%;background-color: '+auxColors[i]+';color:'+auxColorsTitle[i]+';margin: 0%"\n\
                        onClick="BasicPills.handleSelect('+i+','+n+','+number+')"><b>'+auxTitles[i]+'</b></li>';
                        auxTextsPills += '\
                        <div class="Pill'+n+' row collapse" id="Text'+i+'Pill'+n+'"\n\
                        style="border:'+auxColors[i]+';border-style: solid;border-radius: 0.5em;margin-top: 1%" >\n\
                        <p>'+auxTexts[i]+'</p>\n\
                        </div>';
                    }
                }

                return '\
                <div style="padding: 0% 5% 0% 5%">\n\
                </br>\n\
                <div class="text-center row">\n\
                <ul class="nav nav-pills nav-justified">'+auxNavPills+'</ul>\n\
                </div>'+auxTextsPills+'</div>'
            },
        handleSelect: function (selectedKey, idTime, number) {
            var clase = '.Pill'+idTime;

            for(var i = 0; i < number; i++){
                var id = '#Text'+i+'Pill'+idTime;
                if(i != selectedKey){
                    if($(clase).hasClass("in")){
                        $(id).css('height','6px');
                        $(id).removeClass('in');
                    }
                }
            }
        },
        handleToolbar: function(name, value){
            if(name === 'borderSize')
            BasicImage.setState('borderSize', value);
        },
        showPreview: function(){
            var state = BasicPills.getState();
            var input = $('#BasicPills_input');
            BasicPills.setState('number',input.val());

            var number = input.val();
            var auxTitles = state.titles;
            var auxTexts = state.texts;
            var auxColors = state.colors;
             var auxColorsTitle = state.colorsTitle;
            var editorBox = '';

            for(var i = 0; i < number ; i++){
                if(auxTitles[i] == null){              
                   auxTitles.push('title'+i);
                }
                if(auxTexts[i] == null){
                    auxTexts.push('text'+i);
                }
                if(auxColors[i] == null){
                    auxColors.push('#f87060');
                }
                if(auxColorsTitle[i] == null){
                    auxColorsTitle.push('white');
                }

                editorBox += '\
                <div class="col-xs-12 text-center"><hr><br><h2>Pill'+i+'</h2></div>\n\
                <div class="col-xs-12 col-sm-6">Titulo:\n\
                <input onchange="BasicPills.setTitle('+i+')" type="text" autofocus id="title'+i+'" value= '+ auxTitles[i] +'></div>\n\
                <div class="col-xs-12 col-sm-3">Color título:\n\
                <input onchange="BasicPills.setColorTitle('+i+')" type="color" name="colorTitle" id="colorT'+i+'" value="'+auxColorsTitle[i]+'"> </div>\n\
                <div class="col-xs-12 col-sm-3">Color:\n\
                <input onchange="BasicPills.setColor('+i+')" type="color" name="favcolor" id="color'+i+'" value="'+auxColors[i]+'"> </div>\n\
                <div class="col-xs-12 well textEditable" onfocus="BasicPills.ponerCKEditor('+i+')" onblur="BasicPills.setText('+i+')" contentEditable id="text'+i+'">'+auxTexts[i]+'</div>';;
            }

            BasicPills.setState('titles',auxTitles);
            BasicPills.setState('texts',auxTexts);
            BasicPills.setState('colors',auxColors);
            BasicPills.setState('colorsTitle',auxColorsTitle);

            $('#configuradores').html(editorBox);
        },
        setTitle: function(id){
            var state = BasicPills.getState();
            var idT = '#title'+id;
            var input = $(idT);
            
            auxTitles = state.titles;
            auxTitles[id] = input.val();
            BasicPills.setState('titles',auxTitles);
        },
        setText: function(id){
            var state = BasicPills.getState();
            var idT = 'text'+id;
            var input = document.getElementById(idT).innerHTML;
            
            auxTexts = state.texts;
            auxTexts[id] = input;
        },
        setColor: function(id){
            var state = BasicPills.getState();
            var idT = '#color'+id;
            var input = $(idT);
           
            auxColors = state.colors;
            auxColors[id] = input.val();
            BasicPills.setState('colors',auxColors);
        },
        setColorTitle: function(id){
            var state = BasicPills.getState();
            var idT = '#colorT'+id;
            var input = $(idT);
           
            auxColorsTitle = state.colorsTitle;
            auxColorsTitle[id] = input.val();
            BasicPills.setState('colorsTitle',auxColorsTitle);
        },
        ponerCKEditor: function(id){
            CKEDITOR.disableAutoInline = true;
            var editId = 'text'+id;
            var cajaEdit = document.getElementById(editId);
            CKEDITOR.inline(cajaEdit);
        }
    });
})();