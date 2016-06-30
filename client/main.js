import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.navigation.onRendered(function() {
  $(document).ready(function(){
    $('.scrollspy').scrollSpy();
    $("#sticky").sticky({topSpacing:0});
  });
});

