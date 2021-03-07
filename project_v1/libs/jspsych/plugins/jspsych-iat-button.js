/**
 * jspsych-iat-button
 * Helene Zhou
 * plugin for displaying an IAT test and getting a button response
 *
 **/


jsPsych.plugins['iat-button'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('stim_image', 'jspsych_iat_stim_image', 'image');

  plugin.info = {
    name: 'iat-button',
    description: '',
    parameters: {
      stim_word: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stim word',
        default: ' ',
        description: 'The HTML string to be displayed.'
      },
      stim_image: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stim image',
        default: '',
        description: 'The image to be displayed'
      },
      left_category_key: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Left category key',
        default: 'E',
        description: 'Key press that is associated with the left category label.'
      },
      right_category_key: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Right category key',
        default: 'I',
        description: 'Key press that is associated with the right category label.'
      },
      left_category_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Left category label',
        array: true,
        default: ['left'],
        description: 'The label that is associated with the stimulus. Aligned to the left side of page.'
      },
      right_category_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Right category label',
        array: true,
        default: ['right'],
        description: 'The label that is associated with the stimulus. Aligned to the right side of the page.'
      },
      label_conjunction: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Label conjunction',
        default: " or ",
        description: 'The conjunction showed when more than one category label (useful in multilanguage experiment).'
      },
      display_fixation: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Display fixation',
        default: true,
        description: 'If true, then html before stimulus will be displayed.'
      },
      fixation_html: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'HTML fixation',
        default: '+',
        description: 'The image to display before stimulus.'
      },
      display_feedback: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Display feedback',
        default: false,
        description: 'If true, then html when wrong will be displayed when user makes an incorrect button press.'
      },
      html_when_wrong: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'HTML when wrong',
        default: '<span style="color: red; font-size: 80px">X</span>',
        description: 'The image to display when a user presses the wrong key.'
      },
      display_pretrial_instructions: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Display pretrial instructions',
        default: false,
        description: 'If true, then the instructions will be shown before the trial. '
      },
      pretrial_instructions: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Pretrial instructions',
        default: " ",
        description: 'Instructions shown before the trial.'
      },
      intrial_instructions: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Intrial instructions',
        default: '<p> </p>',
        description: 'Instructions shown during the trial.'
      },
      force_correct_button_press: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Force correct button press',
        default: false,
        description: 'If true, the user will be forced to press the correct button in order to advance to the next trial after a  press the wrong one.'
      },
      stim_btn_association: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus key association',
        options: ['left', 'right', 'both'],
        default: 'undefined',
        description: 'Stimulus will be associated with either "left" or "right", or both of the two.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    // styling elements 
    var btn_height;
    var btn_width;
    var btn_fontsize;
    var btn_pos_x;
    var btn_pos_y;
    var fix_pos;
    if (window.innerHeight <= window.innerWidth) {
      btn_width = '34vw';
      btn_height = '13vh';
      btn_fontsize = '2.6vw';
      btn_pos_x = 13;
      btn_pos_y = 4;
    } else {
      btn_width = '44vw';
      btn_height = '13vw';
      btn_fontsize = '4.3vw';
      btn_pos_x = 4;
      btn_pos_y = 8;
    }
    var html_str = "";
    html_str += "<div id='iat_display' style='overflow: hidden; height:" + 0.8 * window.innerHeight + "px;  width: 100%; display: flex; overflow-x: hidden; justify-content: center; align-items: center; text-align: center;";
    if (window.innerHeight > window.innerWidth) {
      html_str += "margin: 8vh 0;'>"
    } else {
      html_str += "margin: 5vh 0;'>";
    }
    // instruction during the trial
    html_str += "<div id='intrial_tips' style='position: absolute; top: 5vh; margin: auto;  text-align: center; z-index: -1;'>" + trial.intrial_instructions + "</div>";
    // instruction before trial
    if (trial.display_pretrial_instructions == true) {
      html_str += "<p id='pretrial_tips' style='position: absolute; z-index: -2; '>";
      html_str += trial.pretrial_instructions + "</p>";
    } else {
      html_str += " ";
    }
    // stimulus area 
    html_str += "<div class='jspsych_iat_stim' style='visibility: hidden; position: absolute; width: 100%; display: flex; justify-content: center; align-items: center; text-align: center;'>";

    // fixation
    if (trial.display_fixation == true) {
      html_str += "<div class='disp_fixation' id='disp_fixation_html' style='visibility: hidden; position: absolute; font-size:" +
        0.188 * Math.min(window.innerHeight, window.innerWidth) + "px; z-index: 0; '>" + trial.fixation_html + "</div>";
    }
    // stimulus words
    html_str += "<p id='jspsych_iat_stim_word' style='font-size:" +
      0.125 * Math.min(window.innerHeight, window.innerWidth) + "px;; z-index: 1; '>" +
      trial.stim_word + "</p>";
    // stimulus image
    html_str += "<img id='jspsych_iat_stim_image' style='position: absolute; max-height:" +
      0.55 * window.innerHeight + "px; z-index: 2; ' src='" +
      trial.stim_image + "'></img>";
    html_str += "</div>";

    // buttons 
    html_str += "<div id='iat_btns'>";
    var btn_iat_left = [];
    html_str += "<button disabled=true id='btn_iat_left' class='button btn_iat btn_iat0' style='height:" +
      btn_height + "; width:" +
      btn_width + "; left:" +
      btn_pos_x + "%; bottom: " +
      btn_pos_y + "%; font-size:" +
      btn_fontsize + ";' data-choice='0'>";
    html_str += trial.left_category_label[0].bold();
    if (trial.left_category_label.length == 1) {
      html_str += "</button>";
    } else {
      html_str +=
        trial.label_conjunction + trial.left_category_label[1].bold() + "</button>";
    }
    var btn_iat_right = [];
    html_str += "<button disabled=true id='btn_iat_right' class='button btn_iat btn_iat1' style='height:" +
      btn_height + "; width:" +
      btn_width + "; right:" +
      btn_pos_x + "%; bottom: " +
      btn_pos_y + "%; font-size:" +
      btn_fontsize + ";' data-choice='1'>";
    html_str += trial.right_category_label[0].bold();
    if (trial.right_category_label.length == 1) {
      html_str += "</button>";
    } else {
      html_str +=
        trial.label_conjunction + trial.right_category_label[1].bold() + "</button>";
    }
    html_str += "</div>";
    // feedback
    if (trial.display_feedback == true) {
      html_str += "<div style='width: 100%'><img id='wrongImgContainer' style='visibility: hidden; position: fixed; width:" +
        btn_height + "; left: 0; right: 0; bottom: " +
        btn_pos_y + "%; margin: auto; z-index: 5;' src=" + trial.html_when_wrong + "></div>";
    } else {
      html_str += " ";
    }
    // finish styling
    html_str += "</div>";
    display_element.innerHTML = html_str;

    // preparing
    // initial variables 
    var response = {
      rt: null,
      button: null,
      correct: null
    };

    var dfix = document.querySelectorAll('.disp_fixation');
    var stims = document.querySelectorAll('.jspsych_iat_stim');
    var btns = document.querySelectorAll('.btn_iat');
    var start_time;
    var end_time;
    var rt;
    var choice;

    // display fixation
    if (trial.display_fixation == true) {
      for (var i = 0; i < dfix.length; i++) {
        dfix[i].style.visibility = "visible";
      }
      jsPsych.pluginAPI.setTimeout(function() {
        for (var j = 0; j < dfix.length; j++) {
          dfix[j].innerHTML = " ";
        }
        start_trial();
      }, 500);
    } else if (!trial.display_fixation == true) {
      start_trial();
    }

    // start trial
    function start_trial() {
      // start timing 
      start_time = performance.now();

      for (var i = 0; i < stims.length; i++) {
        stims[i].style.visibility = "visible";
      }
      for (var j = 0; j < btns.length; j++) {
        btns[j].disabled = false;
        // record click 
        display_element.querySelector('.btn_iat' + j)
          .addEventListener('click', function(e) {
            choice = e.currentTarget.getAttribute('data-choice');
            after_response(choice);
          });
      }
    }

    // function to handle responses by the subject
    function after_response(choice) {
      window.navigator.vibrate(5);
      // measure rt
      end_time = performance.now();
      rt = end_time - start_time;
      response.rt = rt;

      if (parseInt(choice) == 0) {
        response.button = "left";
      } else if (parseInt(choice) == 1) {
        response.button = "right";
      }


      // feedback
      var wImg = document.getElementById("wrongImgContainer");

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      for (var i = 0; i < stims.length; i++) {
        stims[i].className += ' responded';
      }

      // disable all the buttons after a response
      for (var j = 0; j < btns.length; j++) {
        // btns[j].removeEventListener('click');
        btns[j].disabled = true;
      }

      if (trial.stim_btn_association == "both" && response.rt !== null) {
        end_trial();
      }


      if ((trial.stim_btn_association == "left" || trial.stim_btn_association == "right") && response.button !== trial.stim_btn_association) {
        response.correct = false;
        if (!trial.response_ends_trial && trial.display_feedback == true) {
          wImg.style.visibility = "visible";
          window.navigator.vibrate(500);
          jsPsych.pluginAPI.setTimeout(function() {
            end_trial();
          }, 1000);
        }
        if (trial.response_ends_trial && trial.display_feedback == true) {
          wImg.style.visibility = "visible";
          window.navigator.vibrate(500);
          jsPsych.pluginAPI.setTimeout(function() {
            end_trial();
          }, 1000);

        } else if (trial.response_ends_trial && trial.display_feedback != true) {

          end_trial();

        } else if (!trial.response_ends_trial && trial.display_feedback != true) {}
      } else if (response.button == trial.stim_btn_association) {
        response.correct = true;
        if (trial.response_ends_trial) {
          end_trial();
        }
      }
    };

    // function to end trial
    function end_trial() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // gather the data for the trial
      var trial_data = {
        "stimulus_image": trial.stim_image,
        "stimulus_word": trial.stim_word,
        "rt": response.rt,
        "button_pressed": response.button,
        "correct": response.correct
      };

      // clear the display
      display_element.innerHTML = '';

      // write data and call to advance to the next trial
      jsPsych.finishTrial(trial_data);
    };



    // end trial if time limit is set
    if (trial.trial_duration !== null && trial.response_ends_trial != true) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }
  };

  return plugin;
})();