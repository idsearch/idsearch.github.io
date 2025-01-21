/* irgendwas app 
 2024-07-03
 die app ruft die lib auf und bindet sie ein
 dann werden die config gelesen _.D.gD(e) get Data
 dann werden die adten gelede´sen _.D.gD(e,Tabkedir)
 dannwerden die daten zur verfügung gestellt

*/
'use strict';
//import { _ } from './lib.min.mjs'; //die RX passen nicht
import { _ } from './lib.min.mjs';

(async () => { document.querySelector(':root').style.setProperty('--baseHue', '340');  //farbliche Coderung der Wartezeit
   
               //console.log(`----------START PROMISE---CFG`);
               await Promise.all( [ 'cfg_k1.json'//Config der Tabellen
                                  , 'L_IC.json'  //Symbole als json
                                  ].map( async e => { //console.log(`--lesen CFG ${e} `);
                                                      const t = e.split('.')[0]
                                                      ,     d = await _.D.gD(e);
                                                      _.DATA[ t       ] = d;
                                                      //console.log(`--lesen CFG ${e} ${t} geschrieben `);
                                                    }
                                       ) 
                                ); //-Erst cfg lesen 
              //console.log(`----------END PROMISE---CFG`);
              
               //console.log('CFG einlesen',_.DATA['cfg_sammler']['cfg']['tableDir']);                 
               //console.log(`----------START PROMISE---TABLE`);
               await Promise.all( [ 
                                    'k1.json' //daten lesen
                                  ]
                                  .map( async e => {//console.log(`--lesen 1 Table ${e} `);
                                                    const t = e.split('.')[0]  
                                                    ,      d = await _.D.gD(e,_.DATA['cfg_'+t]['cfg']['tableDir']); //getData ??Problem lesen von cfg ndann erst table
                                                    _.DATA[ t       ] = d;
                                                    if(d?.length||false) { _.DATA['fs_'+ t ] = d;}
                                                    //console.log(`--lesen TABLE ${e} ${t} geschrieben `);
                                                   } ) ); 
                                   
                                      ; 
               //console.log(`----------END PROMISE---TABLE`);
               const ic = document.querySelector('#icons'); 
               _.I.aI(_.DATA['L_IC'],ic);
                                    //document.querySelector('#icons').innerHTML=`${_.I.allIcons(_.DATA['L_IC'])}`
                //console.log(`----------END ALL ICONS---`);
/*      
                _.D.sT('grpsum',{header:'Summe Ausfallzeit',subheader:'Arbeitsfolge vs. Verlustart'});//Für Groupsum Vorbereiten
                _.D.sT('bxplt',{header:'BoxPlot',subheader:'SORTE vs. STATUS'});//Für Boxplot Vorbereiten
*/               

                [ "k1"]
                .map(e=>{ _.GT.push(e);   //Tabelle zub Gloabl Table hizufügen, bei Änderungen der Group Values werden die entsp filter angeandt
                          _.GX[e]={};     //Analytics anlegen und leeren
                          _.D.sT(e,_.DATA['cfg_'+e]['cfg']);  //sT setTable main table p 
                          _.T.rf(e);                          //rf refresh
                        });
                      

                window._=_; //die LIB wird nach aussen als EINE Variable gegeben
                _.T.delGF();//alle Filter aus


                _.fbtnsave= async (event) =>{ document.querySelectorAll('.modal'   )[0].style.display = 'none';}
                
                document.querySelector(':root').style.setProperty('--baseHue', '210');  //farbliche Codierung der Wratezeit
              })() //Laden der Start-Daten in den Memory
;