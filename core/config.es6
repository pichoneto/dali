export default {
    xml_path: "dali_documents/add_xml", //"http://lamas.dit.upm.es:3000/dali_documents/add_xml",
    exercise_render_template_iframe_src: "./exercises/index.html",
    scorm_ejs: "/lib/scorm/scorm_nav.ejs",
    visor_ejs: "./lib/visor/index.ejs",
    scorm_zip: "./lib/scorm/scorm.zip",
    visor_zip: "./lib/visor/dist.zip",
    export_url: "http://127.0.0.1:8081/saveConfig",
    import_url: "http://127.0.0.1:8081/getConfig",
    pluginList: [
        'BasicImage',
        'BasicText',
        'BasicVideo',
        'Youtube',
        'Webpage',
        'CajasColorBis',
        'Container',
        'ListaNumerada',
        'RelacionaAll'
    ]
};


/*

Dali.Config = {
    xml_path: "/dali_documents/add_xml",
    exercise_render_template_iframe_src: "/dist/exercises/index.html",
    scorm_ejs: "/assets/lib/scorm/scorm_nav.js",
    scorm_visor_ejs: "/assets/lib/scorm/index.js",
    visor_ejs: "/assets/lib/visor/index.js",
    scorm_zip: "/assets/lib/scorm/scorm.zip",
    visor_zip: "/assets/lib/visor/dist.zip",
    export_url: "http://127.0.0.1:8081/saveConfig",
    import_url: "http://127.0.0.1:8081/getConfig"
};


 */
