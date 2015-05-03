module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    docular: {
      docular_webapp_target: 'docs',
      showDocularDocs: false,
      showAnguarlDocs: false,
      groups: [
        {
          groupTitle: 'Physician Directory',
          groupId: 'physician-directory',
          groupIcon: 'icon-book',
          showSource: true,
          sections: [
            {
              id: 'services',
              title: 'Services',
              scripts: [
                'www/app/services/api.js',
                'www/app/services/geo.js'
              ]
            },
            {
              id: 'filters',
              title: 'Filters',
              scripts: [
                'www/app/filters.js'
              ]
            }
          ]
        }
      ],
    }
  });

  grunt.loadNpmTasks('grunt-docular');
  grunt.registerTask('default', ['docular']);
};
