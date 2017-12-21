import * as $ from 'jquery'
export class Dashboard {

  attached(){
    $(document).ready(function(){
      $('.menu .item').tab({history:false});
    });
  }
}
