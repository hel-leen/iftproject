// assign the stims that belonged to 4 groups respectively 
const category_info = [

  {
    Group: "正面的",
    Word: [
      "喜悦",
      "友爱",
      "美妙",
      "和平",
      "愉快",
      "光荣",
      "欢笑",
      "热情"
    ],
    Image: null
  },
  {
    Group: "负面的",
    Word: [
      "痛苦",
      "恐怖",
      "低劣",
      "可怕",
      "糟糕",
      "肮脏",
      "伤害",
      "失败"
    ],
    Image: null
  },
  {
    Group: "自己",
    Word: [
      "我",
      "我的",
      "我们",
      "我们的",
    ],
    Image:null
  },
  {
    Group: "他人",
    Word: [
      "他",
      "他的",
      "他们",
      "他们的",
    ],
    Image:null
  },
];

// get user ID
var uuid =  jsPsych.data.getURLVariable('subject');
if (!uuid) {
	uuid = 'null_id';
}


//randomize the placement of pos and neg labels 
//randomize the cong and incong test order 
var rdm = Math.floor((Math.random() * 2));
var rdm2 = Math.floor((Math.random() * 2));

//add the info 
jsPsych.data.addProperties({subject: uuid, label_position: rdm, test_order: rdm2});
console.log(jsPsych.data.get());


// count the number of trials
var n_practice = 5; 
var n_cong_incong = 0;
if (!category_info[2].Word) {
  n_cong_incong +=  category_info[2].Image.length;
} else if (!category_info[2].Image)
{
  n_cong_incong +=  category_info[2].Word.length;
} else {
  n_cong_incong +=  category_info[2].Word.length + category_info[2].Image.length;
  }
  
if (!category_info[3].Word) {
n_cong_incong +=  category_info[3].Image.length;
} else if (!category_info[3].Image)
{
  n_cong_incong +=  category_info[3].Word.length;
} else {
  n_cong_incong +=  category_info[3].Word.length + category_info[3].Image.length;
  }

var n_trials = 3*(category_info[0].Word.length + category_info[1].Word.length) + 4*n_cong_incong + 2*n_practice;
console.log(n_trials);

// assign the instructions 
const instr = [
  ' 接下来，你需要将屏幕中间出现的词语或图片通过尽可能快地按相应的按钮进行分类。 <br>',
  ' 下面列出了类别标签以及属于那些类别的项目（词语或图片）：<br> ',
  ' 注意屏幕下方的左右两枚按钮<br><br>',
  ' <big style="line-height: 2;">如果词语或图片属于<strong>',
  '</strong>或者<strong>',
  '</strong>，请按左边的按钮 <br></big>',
  '</strong>，请按右边的按钮  <br></big>',
  ' <br>词语或图片将每次一个呈现在屏幕中间，<br>请尽可能快地按键，但同时要确保分类正确。 <br><br>点击任意按钮开始测试<br><br>',
  ' <br> 你已完成测验。感谢你的参与！'
];



// assigning the blocks 
const instructions_block_default = {
  type: 'iat-button',
  stim_btn_association: "both",
  label_conjunction: ' 或 ',
  display_fixation: false,
  display_pretrial_instructions: true,
  response_ends_trial: true,
  data: {
    iat_type: 'instruction'
  }
};

const trial_block_default_timeline = {
  type: 'iat-button',
  stim_image: jsPsych.timelineVariable('stim_image'),
  stim_word: jsPsych.timelineVariable('stim_word'),
  stim_btn_association: jsPsych.timelineVariable('stim_btn_association'),
  label_conjunction: ' 或 ',
  html_when_wrong: '../resources/stimuli/wrong.png',
  intrial_instructions: '<p style="opacity: 0.6;">如果你按下错误的按钮，屏幕中会出现红色的<red style="color: red;">X</red>号</p>',
  response_ends_trial: true,
  display_feedback: true,
  on_finish: function() {
        var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(curr_progress_bar_value + (1/n_trials));
  }
};

// display the groups of items and get into fullscreen 
var fullscreen = {
  type: 'fullscreen',
  	on_finish: function(){
        jsPsych.setProgressBar(0.1); 
    },
  fullscreen_mode: true,
  message: function() {
    var html = '<div class="text_m"><br>' +
      instr[0].toString() +
      instr[1].toString() + '<br></div>' +
      ' <div> <table class="category_table">' +
      ' <tr> <th><big> 类别</big></th>' +
      ' <th><big>  项目</big></th> </tr>';
    category_info.forEach(generateTable);

    function generateTable(item) {
      html += '<tr> <td><strong>';
      html += item.Group;
      html += '</strong></td>';
      html += '<td>';
      if (!item.Image) {
        html += item.Word.join('、');
        html += '</td></tr>';
      } else if (!item.Word) {
        html += '与”' + item.Group.toLowerCase() + '“有关的图片 ';
        html += '</td></tr>';
      }
    }
    html += '</table><br>';
    html += '<p class="text_s">为保证实验效果，请讲屏幕调至适宜的亮度，并尽量减少无关干扰。<br>点击下面的按钮开启全屏模式并进入测验</p><br>';
	
    return html
  },
  button_label: '继续'
};


// initialling pos_neg_train
// instructions
var instructions_block_pos_neg_train = {
  ...instructions_block_default,
  left_category_label: [category_info[0+rdm].Group],
  right_category_label: [category_info[1-rdm].Group],
  pretrial_instructions: " <br>" +
    instr[2] + instr[3] +
    category_info[0+rdm].Group + instr[5] +
     instr[3] +
    category_info[1-rdm].Group +  instr[6]  +
     instr[7]
};

// timeline
var trial_block_pos_neg_train_timeline = {
  ...trial_block_default_timeline,
  display_feedback: true,
  left_category_label: [category_info[0+rdm].Group],
  right_category_label: [category_info[1-rdm].Group],
  data: {
    iat_type: 'train'
  }
};
// timeline_variables
var trial_block_pos_neg_train_timeline_variables = [];
for (var i = 0; i < (category_info[0+rdm].Word.length); i++) {
  trial_block_pos_neg_train_timeline_variables[i] = {
    stim_btn_association: "left",
    stim_word: category_info[0+rdm].Word[i]
  };
}
for (var i = category_info[0+rdm].Word.length; i < (category_info[0+rdm].Word.length + category_info[1-rdm].Word.length); i++) {
  trial_block_pos_neg_train_timeline_variables[i] = {
    stim_btn_association: "right",
    stim_word: category_info[1-rdm].Word[i - category_info[0+rdm].Word.length]
  };
}
// block obj
var trial_block_pos_neg_train = {
  timeline: [trial_block_pos_neg_train_timeline],
  timeline_variables: trial_block_pos_neg_train_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

// initialling categ_train 
var instructions_block_categ_train = {
   ...instructions_block_default,
  left_category_label: [category_info[2+rdm].Group],
  right_category_label: [category_info[3-rdm].Group],
  pretrial_instructions: " 注意分类按钮上的标签已变化。<br><br>" +
    instr[3] +
    category_info[2+rdm].Group + instr[5] +
     instr[3] +
    category_info[3-rdm].Group +  instr[6]  +
     instr[7]
};
// timeline
var trial_block_categ_train_timeline = {
  ...trial_block_default_timeline,
  display_feedback: true,
  left_category_label: [category_info[2+rdm].Group],
  right_category_label: [category_info[3-rdm].Group],
  data: {
    iat_type: 'categ_train'
  }
};
// timeline_variables
var trial_block_categ_train_timeline_variables = [];
  for (var i = 0; i < category_info[2+rdm].Word.length; i++) {
    trial_block_categ_train_timeline_variables[i] = {
      stim_btn_association: "left",
      stim_word: category_info[2+rdm].Word[i]
    };
  }
  for (var i = category_info[2+rdm].Word.length; i < (category_info[2+rdm].Word.length + category_info[3-rdm].Word.length); i++) {
    trial_block_categ_train_timeline_variables[i] = {
      stim_btn_association: "right",
      stim_word: category_info[3-rdm].Word[i - category_info[2+rdm].Word.length]
    };
  }
// block obj
var trial_block_categ_train = {
  timeline: [trial_block_categ_train_timeline],
  timeline_variables: trial_block_categ_train_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

// initialling cong_practice 
var instructions_block_cong_prac = {
  ...instructions_block_default,
  left_category_label: [category_info[0+rdm].Group, category_info[2+rdm].Group],
  right_category_label: [category_info[1-rdm].Group, category_info[3-rdm].Group],
  pretrial_instructions: " 注意，下面我们将提高任务的难度。 <br>" +
    instr[3] +
    category_info[0+rdm].Group + instr[4] + category_info[2+rdm].Group + instr[5] +
     instr[3] +
    category_info[1-rdm].Group + instr[4] + category_info[3-rdm].Group + instr[6]  +
     instr[7]
};
// timeline
var trial_block_cong_prac_timeline = {
  ...trial_block_default_timeline,
  display_feedback: true,
  left_category_label: [category_info[0+rdm].Group, category_info[2+rdm].Group],
  right_category_label: [category_info[1-rdm].Group, category_info[3-rdm].Group],
  data: {
    iat_type: 'cong_practice'
  }
};
// timeline_variables 
var trial_block_cong_prac_timeline_variables = trial_block_pos_neg_train_timeline_variables.concat(trial_block_categ_train_timeline_variables);
console.log(trial_block_cong_prac_timeline_variables);
// block obj
var trial_block_cong_prac = {
  timeline: [trial_block_cong_prac_timeline],
  timeline_variables: trial_block_cong_prac_timeline_variables,
  sample: {
    type: 'without-replacement',
    size: n_practice,
  }
};

// initialling cong_test
// timeline
var trial_block_cong_test_timeline = {
  ...trial_block_default_timeline,
  display_feedback: true,
  left_category_label: [category_info[0+rdm].Group, category_info[2+rdm].Group],
  right_category_label: [category_info[1-rdm].Group, category_info[3-rdm].Group],
  data: {
    iat_type: 'cong_test'
  }
};
// timeline_variables 
var trial_block_cong_test_timeline_variables = trial_block_cong_prac_timeline_variables;
// block obj
var trial_block_cong_test = {
  timeline: [trial_block_cong_test_timeline],
  timeline_variables: trial_block_cong_test_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

// initialling rev_categ_train 
var instructions_block_rev_categ_train = {
  ...instructions_block_default,
  right_category_label: [category_info[2+rdm].Group],
  left_category_label: [category_info[3-rdm].Group],
  pretrial_instructions: " 注意分类按钮上标签的变化。<br><br>" +
     instr[3] +
    category_info[3-rdm].Group + instr[5] +
     instr[3] +
    category_info[2+rdm].Group +  instr[6]  +
     instr[7] 
};
// timeline
var trial_block_rev_categ_train_timeline = {
  ...trial_block_default_timeline,
  display_feedback: true,
  right_category_label: [category_info[2+rdm].Group],
  left_category_label: [category_info[3-rdm].Group],
  data: {
    iat_type: 'rev_categ_train'
  }
};
// timeline_variables
var trial_block_rev_categ_train_timeline_variables = [];
  for (var i = 0; i < category_info[2+rdm].Word.length; i++) {
    trial_block_categ_train_timeline_variables[i] = {
      stim_btn_association: "right",
      Stim_word: category_info[2+rdm].Word[i]
    };
  }
  for (var i = category_info[2+rdm].Word.length; i < (category_info[2+rdm].Word.length + category_info[3-rdm].Word.length); i++) {
    trial_block_categ_train_timeline_variables[i] = {
      stim_btn_association: "left",
      Stim_word: category_info[3-rdm].Word[i - category_info[2+rdm].Word.length]
    };
  }

// block obj
var trial_block_rev_categ_train = {
  timeline: [trial_block_rev_categ_train_timeline],
  timeline_variables: trial_block_rev_categ_train_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

// initialling incong_practice 
var instructions_block_incong_prac = {
  ...instructions_block_default,
  right_category_label: [category_info[1-rdm].Group, category_info[2+rdm].Group],
  left_category_label: [category_info[0+rdm].Group, category_info[3-rdm].Group],
  pretrial_instructions: " 注意，下面我们将略微提高任务的难度。 <br><br>" +
    instr[3] +
    category_info[0+rdm].Group + instr[4] + category_info[3-rdm].Group + instr[5] +
     instr[3] +
    category_info[1-rdm].Group + instr[4] + category_info[2+rdm].Group + instr[6]  +
     instr[7]
};
// timeline
var trial_block_incong_prac_timeline = {
  ...trial_block_default_timeline,
  display_feedback: true,
  right_category_label: [category_info[1-rdm].Group, category_info[2+rdm].Group],
  left_category_label: [category_info[0+rdm].Group, category_info[3-rdm].Group],
  data: {
    iat_type: 'incong_practice'
  }
};
// timeline_variables 
var trial_block_incong_prac_timeline_variables = trial_block_pos_neg_train_timeline_variables.concat(trial_block_rev_categ_train_timeline_variables);
// block obj
var trial_block_incong_prac = {
  timeline: [trial_block_incong_prac_timeline],
  timeline_variables: trial_block_incong_prac_timeline_variables,
  sample: {
    type: 'without-replacement',
    size: n_practice,
  }
};

// initialling incong_test
// timeline
var trial_block_incong_test_timeline = {
  ...trial_block_default_timeline,
  display_feedback: true,
  right_category_label: [category_info[1-rdm].Group, category_info[2+rdm].Group],
  left_category_label: [category_info[0+rdm].Group, category_info[3-rdm].Group],
  data: {
    iat_type: 'incong_test'
  }
};
// timeline_variables 
var trial_block_incong_test_timeline_variables = trial_block_incong_prac_timeline_variables;
// block obj
var trial_block_incong_test = {
  timeline: [trial_block_incong_test_timeline],
  timeline_variables: trial_block_incong_test_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

var debrief_block = {
  type: "html-button-response",
  on_start: function() {
    jsPsych.setProgressBar(0);
    jsPsych.data.get().localSave('json', uuid + '.txt');
	var all_data = jsPsych.data.get();
    console.log("test all_data ", all_data);
    // saveDatatoServer;
  },
  stimulus: function() {
    // mean RT
    var cong_test_mean = jsPsych.data.get().filter({
      iat_type: 'cong_test'
    }).filterCustom(function(x) {
      return x.rt < 10000
    });
    var mean_correct_responses_cong_test = cong_test_mean.filter({
      correct: true
    }).select('rt').mean();
    var incong_test_mean = jsPsych.data.get().filter({
      iat_type: 'incong_test'
    }).filterCustom(function(x) {
      return x.rt < 10000
    });
    var mean_correct_responses_incong_test = incong_test_mean.filter({
      correct: true
    }).select('rt').mean();
    // get overall sd
    var sd = cong_test_mean.join(incong_test_mean).filter({
      correct: true
    }).select('rt').sd();
    var d = (mean_correct_responses_incong_test - mean_correct_responses_cong_test) / sd;
    return  '<p class="text_l"><br><br>' + instr[8] + '<br></p>' +
     ' <p class="text_m">你可以点击下面的按钮了解测验原理，或者结束本研究。<br><br></p>' +
 	' <button class="button" id="get_info" onclick="window.location.href = \'./information.html\'" style="margin: 20px 10px; border-radius: 5px; background-color: rgb(55 155 99);">原理介绍</button>' +
     '<button class="button" id="end_exp" onclick="open(location, \'_self\').close()" style="margin: 20px 10px; border-radius: 5px; background-color: rgb(175 55 99);">结束研究</button>' 
  },
  choices: ['OK'],
  button_html: '<button id="jspsych-fullscreen-btn" style="display: none;" >%choice%</button>',
};


// nesting the blocks 
var block_pos_neg = {
  timeline: [
    instructions_block_pos_neg_train,
    trial_block_pos_neg_train
  ],
  randomize_order: false,
};

var block_cong = {
  timeline: [
    instructions_block_categ_train, 
    trial_block_categ_train,
    instructions_block_cong_prac,
    trial_block_cong_prac,
    trial_block_cong_test
  ],
  randomize_order: false,
};

var block_incong = {
  timeline: [
    instructions_block_rev_categ_train,
    trial_block_rev_categ_train,
    instructions_block_incong_prac,
    trial_block_incong_prac,
    trial_block_incong_test
  ],
  randomize_order: false,
};

var block_cong_incong = {
  timeline: [
  [block_incong, block_cong][rdm2],
  [block_cong, block_incong][rdm2]
  ],
  randomize_order: true,
};

function saveDatatoServer() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // remember to change this!!!
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if(xhr.status == 200){
      var response = JSON.parse(xhr.responseText);
      console.log(response.success);
    }
  };
  xhr.send(jsPsych.data.get().json());
}

var timeline = [];
// timeline.push(fullscreen);
timeline.push(block_pos_neg);
timeline.push(block_cong_incong);
timeline.push(debrief_block);

jsPsych.init({
  timeline: timeline,
  display_element: 'experiment_content',
  // preload_images: category_info[2].Image.concat(category_info[3].Image),
  show_progress_bar: true,
  message_progress_bar: ' ',
  auto_update_progress_bar: false, 
  on_finish: function() {
	 jsPsych.data.displayData('json');
    // jsPsych.data.get().localSave('json', uuid + '.txt');
    // console.log("test mean", jsPsych.data.get().filter({
      // correct: true
    // }).select('rt').mean());
//    saveDatatoServer;
  }
});

$(document).ready(function(){
 $("body").fadeIn("slow");
 //$("#preSurvey").fadeOut();
});
