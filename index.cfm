<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="Energy Broadcasting Assistance Service">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/index.css"/>
        <link rel="stylesheet" href="lib/leaflet/leaflet.css"/>
        <link rel="stylesheet" href="lib/jquery-ui/jquery-ui.css">
        <link rel="stylesheet" href="lib/jquery-ui/jquery-ui.theme.css">
        <link rel="stylesheet" href="lib/src/AnimatedPolyLine/leaflet.draw.css"/>
        <script src="https://kit.fontawesome.com/9cd2863a1e.js" crossorigin="anonymous"></script>
        <title>Project Unicorn</title>
    </head>
    <body>
        <div id="tsparticles" style="display:block;position:absolute;opacity:0.5;"></div>
        <div id="tabs">
            <ul>
                <li>
                    <a href="#tabs-1">Map</a>
                </li>
                <li>
                    <a href="#tabs-2">Events</a>
                </li>
                <li>
                    <a href="#tabs-3">People</a>
                </li>
                <li>
                    <a href="#tabs-4">Private</a>
                </li>
            </ul>
            <div id="tabs-1">
                <div class="MainPage">
                    <div class="TopActions" id="MapSetup">
                        <button id="CLKPry" class="OneUse">Click to Pray with Us</button>
                        <button id="GETCnt" onclick="GoogClick( GoogServices.WorldView, goog.WorldView );">-0-</button>
                    </div>
                </div>
                <div class="MainPage" id="GoogleServices" style="display:none;">
                    <div class="TopActions">
                        <center>
                            <button id="SHOSat">Satelite</button>
                            <button id="SHOTra">Traffic</button>
                            <button id="SHOHyb">Hybrid</button>
                            <button id="SHOTer">Terrain</button>
                            <button id="SHOStr">Streets</button>
                            <a class="ButtonLike" href="#noWhere" onclick="tryPolyLines();">Animate!</a>
                        </center>
                        <div id="slider"></div>
                        <button class="info">Loading.  One moment, please...</button>&nbsp;
                    </div>
                </div>
                <div id="map"></div>
            </div>
            <div id="tabs-2">
                <div class="MainPage" id="MapDatsets" style="display:none;">
                    <div class="TopActions">
                        <center>
                            <h2>
                                <button id="GETLoc">testLoc</button>
                                <button id="GETQua" class="OneUse">Quakes</button>
                                <button id="GETHos" class="OneUse">Hospitals</button>
                                <button id="GETFir" class="OneUse">Fires</button>
                                <button id="GETCon" class="OneUse">Conflicts</button>
                                <button id="GETRad" class="OneUse">Radar</button>
                            </h2>
                        </center>
                        <button class="info">Loading.  One moment, please...</button>
                    </div>
                    <div style="height:82vh;width:fit;margin:fit;padding:fit;padding-left:15px;">
                        <h2>Data Summary:</h2>
                        <details open>
                            <summary class="L1" style="width:90%">
                                <h3>Information about the datasets in use and a log of the traffic.</h3>
                            </summary>
                            <wbr/>
                            <details open>
                                <summary class="L2">
                                    <h4>Datasets</h4>
                                </summary>
                                <details>
                                    <summary class="L3 item">Quakes</summary>
                                    <div class="coolBorder" id="QuakesInfo">-Empty-</div>
                                </details>
                                <details>
                                    <summary class="L3 item">Hospitals</summary>
                                    <div class="coolBorder" id="HospitalsInfo">-Empty-</div>
                                </details>
                                <details>
                                    <summary class="L3 item">Fires</summary>
                                    <div class="coolBorder" id="FiresInfo">-Empty-</div>
                                </details>
                                <details>
                                    <summary class="L3 item">Conflicts</summary>
                                    <div class="coolBorder" id="ConflictsInfo">-Empty-</div>
                                </details>
                                <details>
                                    <summary class="L3 item">Radar</summary>
                                    <div class="coolBorder" id="RadarInfo">-Empty-</div>
                                </details>

                            </details>
                            <wbr/>
                            <details>
                                <summary class="L2">
                                    <h4>Traffic</h4>
                                </summary>
                                <details>
                                    <summary class="L3 item">Quakes</summary>
                                    <div class="coolBorder" id="QuakesDetail">-Empty-</div>
                                </details>
                                <details>
                                    <summary class="L3 item">Hospitals</summary>
                                    <div class="coolBorder" id="HospitalsDetail">-Empty-</div>
                                </details>
                                <details>
                                    <summary class="L3 item">Fires</summary>
                                    <div class="coolBorder" id="FiresDetail">-Empty-</div>
                                </details>
                                <details>
                                    <summary class="L3 item">Conflicts</summary>
                                    <div class="coolBorder" id="ConflictsDetail">-Empty-</div>
                                </details>
                                <details>
                                    <summary class="L3 item">Radar</summary>
                                    <div class="coolBorder" id="RadarDetail">-Empty-</div>
                                </details>
                            </details>
                            <wbr/>
                            <p>
                                <section class="content">
                                    blah blah blaaah, bllaaahh. blah blah blah.
                                </section>
                            </p>

                            <footer>
                                <p>Some stuff at the end which only lawyers read...
                                </p>
                                <p>Maybe some more corporate communication stuff here
                                </p>
                            </footer>

                        </details>
                    </div>
                </div>
            </div>
            <div id="tabs-3">
                <div class="MainPage" id="PeopleGroups" style="display:none;">
                    <div class="TopActions">
                        <button class="info">Loading.  One moment, please...</button>
                    </div>
                </div>
            </div>
            <div id="tabs-4">
                <div class="MainPage" id="PersonalInfo" style="display:none;">
                    <div class="TopActions">
                        <button id="SHOLoc">My Loc</button>
                        <button class="info">Loading.  One moment, please...</button>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <p>&copy; 2022 Silver Shark Software</p>
        </footer>

        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <script src="lib/jquery-ui/jquery-ui.min.js"></script>
        <script src="lib/leaflet/leaflet.js"   type="text/javascript"></script>
        <script src="script/tmpDataset.js"   type="text/javascript"></script>
        <script src="lib/misc/json2xml.js"   type="text/javascript"></script>
        <script src="lib/misc/xml2json.js"   type="text/javascript"></script>
        <script src="script/us-states.js"   type="text/javascript"></script>
        <!-- <script src="lib/leaflet-ant-path-bower-master/dist/leaflet-ant-path.js" type="text/javascript"></script> -->
        <script src="script/index.js" type="text/javascript"></script>
        <script src="doc/dev/fireScraper.js" async defer type="text/javascript"></script>
        <script src="lib/src/AnimatedPolyLine/leaflet.draw.js"   type="text/javascript"></script>
        <script src="lib/src/AnimatedPolyLine/leaflet.motion.min.js"   type="text/javascript"></script>
        
        <script src="script/PolyLineShit.js" defer  type="text/javascript"></script>
        
        <script src="https://cdn.jsdelivr.net/npm/tsparticles-engine" type="text/javascript"></script>
        <script src="https://cdn.jsdelivr.net/npm/tsparticles/tsparticles.bundle.min.js" type="text/javascript"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-particles@2.1.4/dist/jquery.particles.min.js" type="text/javascript"></script>
    </body>
</html>