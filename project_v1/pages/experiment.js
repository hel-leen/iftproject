// assign the stims that belonged to 4 groups respectively 
const category_info = [
  {
    Group: "我",
    Word: [
      "我",
      "自己",
      "自我",
    ],
    Image: null
  },
  {
    Group: "非我",
    Word: [
      "他",
      "他人",
      "别人",
    ],
    Image: null
  },
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
    Group: "正面的",
    Word: [
      "生命",
      "安宁",
       "健康",
      "活力",
    ],
    Image: null
  },
  {
    Group: "负面的",
    Word: [
      "死亡",
      "灾难",
       "疾病",
      "毁灭",
    ],
  }
];


// get user ID
var userInfo = {
  url: window.location.href,
  uuid: function() {
	if (this.url.indexOf( "uuid=" )< 0)
	{
		return "null_id";
	} else {
    return this.url.slice( this.url.indexOf( "uuid=" ) + 5,   );
	}
  },
  timestamp: new Date().getTime(),
}

//randomize the placement of pos and neg labels 
//randomize the cong and incong test order 
var rdm = Math.floor((Math.random() * 2));
var rdm2 = Math.floor((Math.random() * 2));

//add the info 
// jsPsych.data.get().addToAll
jsPsych.data.addProperties({
  uuid: userInfo.uuid(),
  label_position: rdm,
  test_order: rdm2
});


// count the number of trials
var n_practice = 3;
var n_cong_incong = 0;
n_cong_incong += category_info[2].Word.length;
n_cong_incong += category_info[3].Word.length;

var n_trials = 5 * (category_info[0].Word.length + category_info[1].Word.length) + 4 * (category_info[2].Word.length + category_info[3].Word.length) + 6 * (category_info[4].Word.length + category_info[5].Word.length) + 2 * n_practice;
console.log(userInfo.uuid(), n_trials);


// assign the instructions 
const instr = [
  '<br>',
  '<div class="text_m">接下来，你需要将屏幕中间出现的词语通过尽可能快地按相应的按钮进行分类。 <br>',
  ' 下面列出了需要分类的词语以及它们所属的类别：<br> ',
    '<p class="text_s">为保证实验效果，请将屏幕调至适宜的亮度，并尽量减少无关干扰、集中注意。<br>点击下面的按钮开启全屏模式并进入测验</p><br>',
  [' 注意屏幕下方的左右两枚按钮<br><br>',
  ' <b style="color: #661122;">注意</b>分类按钮上的标签已变化。<br><br>',
  ' <b style="color: #661122;">注意</b>分类按钮上标签的变化。<br><br>',
  ' <b style="color: #661122;">注意</b>，下面我们将提高任务的难度。 <br><br>',
  ' <b style="color: #661122;">注意</b>，下面任务难度将会提高。 <br><br>',
  ],
  ' <big style="line-height: 2;">如果词语属于<b>',
  '</b>或者<b>',
  '</b>，请按左边的按钮 <br></big>',
  '</b>，请按右边的按钮  <br></big>',
  ' <br>词语或图片将每次一个呈现在屏幕中间，<br>请在确保分类正确的情况下<b style="color: #223388;">尽可能快</b>地按键。 ',
  '<br>快速反应时少量错误属正常情况，请无需担心。',
  '<br><br>点击任意按钮开始测试<br><br>',
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

    jsPsych.setProgressBar(curr_progress_bar_value + (1 / n_trials));
    console.log(jsPsych.data.getLastTimelineData()
      .json(), jsPsych.data.get()
      .select('rt')
      .mean());

  }
};

// display the groups in exp1 of items and get into fullscreen 
var groups_display = {
  type: 'fullscreen',
  on_finish: function() {
    jsPsych.setProgressBar(0.1);
  },
  fullscreen_mode: true,
  message: function() {
    var html = '<br>' +
      instr[1] +
      instr[2] + '<br></div>' +
      ' <div> <table class="category_table">' +
      ' <tr> <th><big> 类别</big></th>' +
      ' <th><big>  词语</big></th> </tr>';
    var category_merge = category_info.slice(0, 4);
    category_merge[2].Word = category_info[2].Word.concat(category_info[4].Word);
    category_merge[3].Word = category_info[3].Word.concat(category_info[5].Word);
    category_merge.forEach(generateTable);

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
    html += instr[3];

    return html
  },
  button_label: '继续'
};



// initialling target_concept_train

// labels
var target_concept_labels = {
  left_category_label: [category_info[0 + rdm].Group],
  right_category_label: [category_info[1 - rdm].Group],
};

// instructions
var instructions_block_target_concept_train = {
  ...instructions_block_default,
  ...target_concept_labels,
  pretrial_instructions: instr[0] +
    instr[4][0] +
    instr[5] +
    category_info[0 + rdm].Group + instr[7] +
    instr[5] +
    category_info[1 - rdm].Group + instr[8] +
    instr[9] + instr[10] + instr[11]
};

// timeline
var trial_block_target_concept_train_timeline = {
  ...trial_block_default_timeline,
  ...target_concept_labels,
  data: {
    iat_type: 'train'
  }
};
// timeline_variables
var trial_block_target_concept_train_timeline_variables = [];
for (var i = 0; i < (category_info[0 + rdm].Word.length); i++) {
  trial_block_target_concept_train_timeline_variables[i] = {
    stim_btn_association: "left",
    stim_word: category_info[0 + rdm].Word[i]
  };
}
for (var i = category_info[0 + rdm].Word.length; i < (category_info[0 + rdm].Word.length + category_info[1 - rdm].Word.length); i++) {
  trial_block_target_concept_train_timeline_variables[i] = {
    stim_btn_association: "right",
    stim_word: category_info[1 - rdm].Word[i - category_info[0 + rdm].Word.length]
  };
}
// block obj
var trial_block_target_concept_train = {
  timeline: [trial_block_target_concept_train_timeline],
  timeline_variables: trial_block_target_concept_train_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

// initialling ini_attr_train
// labels
var ini_attr_train_labels = {
  left_category_label: [category_info[2 + rdm].Group],
  right_category_label: [category_info[3 - rdm].Group],
};

var instructions_block_ini_attr_train = {
  ...instructions_block_default,
  ...ini_attr_train_labels,
  pretrial_instructions: instr[0] +
    instr[4][1] +
    instr[5] +
    category_info[2 + rdm].Group + instr[7] +
    instr[5] +
    category_info[3 - rdm].Group + instr[8] +
    instr[9] + instr[10] + instr[11]
};

// initialling ini_attr_train_A 
// timeline
var trial_block_ini_attr_train_A_timeline = {
  ...trial_block_default_timeline,
  ...ini_attr_train_labels,
  data: {
    iat_type: 'ini_attr_train_A'
  }
};
// timeline_variables
var trial_block_ini_attr_train_A_timeline_variables = [];
for (var i = 0; i < category_info[2 + rdm].Word.length; i++) {
  trial_block_ini_attr_train_A_timeline_variables[i] = {
    stim_btn_association: "left",
    stim_word: category_info[2 + rdm].Word[i]
  };
}
for (var i = category_info[2 + rdm].Word.length; i < (category_info[2 + rdm].Word.length + category_info[3 - rdm].Word.length); i++) {
  trial_block_ini_attr_train_A_timeline_variables[i] = {
    stim_btn_association: "right",
    stim_word: category_info[3 - rdm].Word[i - category_info[2 + rdm].Word.length]
  };
}
// block obj
var trial_block_ini_attr_train_A = {
  timeline: [trial_block_ini_attr_train_A_timeline],
  timeline_variables: trial_block_ini_attr_train_A_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

// initialling ini_attr_train_B 
// timeline
var trial_block_ini_attr_train_B_timeline = {
  ...trial_block_default_timeline,
  ...ini_attr_train_labels,
  data: {
    iat_type: 'ini_attr_train_B'
  }
};
// timeline_variables
var trial_block_ini_attr_train_B_timeline_variables = [];
for (var i = 0; i < category_info[4 + rdm].Word.length; i++) {
  trial_block_ini_attr_train_B_timeline_variables[i] = {
    stim_btn_association: "left",
    stim_word: category_info[4 + rdm].Word[i]
  };
}
for (var i = category_info[4 + rdm].Word.length; i < (category_info[4 + rdm].Word.length + category_info[5 - rdm].Word.length); i++) {
  trial_block_ini_attr_train_B_timeline_variables[i] = {
    stim_btn_association: "right",
    stim_word: category_info[5 - rdm].Word[i - category_info[4 + rdm].Word.length]
  };
}
// block obj
var trial_block_ini_attr_train_B = {
  timeline: [trial_block_ini_attr_train_B_timeline],
  timeline_variables: trial_block_ini_attr_train_B_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

// initialling instructions_block_cong blabla
// labels
var cong_labels = {
  left_category_label: [category_info[2 + rdm].Group, category_info[0 + rdm].Group],
  right_category_label: [category_info[3 - rdm].Group, category_info[1 - rdm].Group]
};

var instructions_block_cong = {
  ...instructions_block_default,
  ...cong_labels,
  pretrial_instructions: instr[0] +
    instr[4][3] +
    instr[5] +
    category_info[2 + rdm].Group + instr[6] + category_info[0 + rdm].Group + instr[7] +
    instr[5] +
    category_info[3 - rdm].Group + instr[6] + category_info[1 - rdm].Group + instr[8] +
    instr[9] + instr[11]
};
// initialling cong_practice_A 
// timeline
var trial_block_cong_prac_A_timeline = {
  ...trial_block_default_timeline,
  ...cong_labels,
  data: {
    iat_type: 'cong_practice_A'
  }
};
// timeline_variables 
var trial_block_cong_prac_A_timeline_variables = trial_block_target_concept_train_timeline_variables.concat(trial_block_ini_attr_train_A_timeline_variables);
console.log(trial_block_cong_prac_A_timeline_variables);
// block obj
var trial_block_cong_prac_A = {
  timeline: [trial_block_cong_prac_A_timeline],
  timeline_variables: trial_block_cong_prac_A_timeline_variables,
  sample: {
    type: 'without-replacement',
    size: n_practice,
  }
};
// initialling cong_practice_B 
// timeline
var trial_block_cong_prac_B_timeline = {
  ...trial_block_default_timeline,
  ...cong_labels,
  data: {
    iat_type: 'cong_practice_B'
  }
};
// timeline_variables 
var trial_block_cong_prac_B_timeline_variables = trial_block_target_concept_train_timeline_variables.concat(trial_block_ini_attr_train_B_timeline_variables);
console.log(trial_block_cong_prac_B_timeline_variables);
// block obj
var trial_block_cong_prac_B = {
  timeline: [trial_block_cong_prac_B_timeline],
  timeline_variables: trial_block_cong_prac_B_timeline_variables,
  sample: {
    type: 'without-replacement',
    size: n_practice,
  }
};

// initialling cong_test_A
// timeline
var trial_block_cong_test_A_timeline = {
  ...trial_block_default_timeline,
  ...cong_labels,
  data: {
    iat_type: 'cong_test_A'
  }
};
// timeline_variables 
var trial_block_cong_test_A_timeline_variables = trial_block_cong_prac_A_timeline_variables;
// block obj
var trial_block_cong_test_A = {
  timeline: [trial_block_cong_test_A_timeline],
  timeline_variables: trial_block_cong_test_A_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

// initialling cong_test_B
// timeline
var trial_block_cong_test_B_timeline = {
  ...trial_block_default_timeline,
  ...cong_labels,
  data: {
    iat_type: 'cong_test_B'
  }
};
// timeline_variables 
var trial_block_cong_test_B_timeline_variables = trial_block_cong_prac_B_timeline_variables;
// block obj
var trial_block_cong_test_B = {
  timeline: [trial_block_cong_test_B_timeline],
  timeline_variables: trial_block_cong_test_B_timeline_variables,
  randomize_order: true,
  repetitions: 1
};



// initialling rev_attr_train
// labels
var rev_attr_train_labels = {
  right_category_label: [category_info[2 + rdm].Group],
  left_category_label: [category_info[3 - rdm].Group],
}

var instructions_block_rev_attr_train = {
  ...instructions_block_default,
  ...rev_attr_train_labels,
  pretrial_instructions: instr[0] +
    instr[4][2] +
    instr[5] +
    category_info[3 - rdm].Group + instr[7] +
    instr[5] +
    category_info[2 + rdm].Group + instr[8] +
    instr[9] + instr[10] + instr[11]
};

// initialling rev_attr_train_A 
// timeline
var trial_block_rev_attr_train_A_timeline = {
  ...trial_block_default_timeline,
  ...rev_attr_train_labels,
  data: {
    iat_type: 'rev_attr_train_A'
  }
};
// timeline_variables
var trial_block_rev_attr_train_A_timeline_variables = [];
for (var i = 0; i < category_info[2 + rdm].Word.length; i++) {
  trial_block_rev_attr_train_A_timeline_variables[i] = {
    stim_btn_association: "right",
    stim_word: category_info[2 + rdm].Word[i]
  };
}
for (var i = category_info[2 + rdm].Word.length; i < (category_info[2 + rdm].Word.length + category_info[3 - rdm].Word.length); i++) {
  trial_block_rev_attr_train_A_timeline_variables[i] = {
    stim_btn_association: "left",
    stim_word: category_info[3 - rdm].Word[i - category_info[2 + rdm].Word.length]
  };
}

// block obj
var trial_block_rev_attr_train_A = {
  timeline: [trial_block_rev_attr_train_A_timeline],
  timeline_variables: trial_block_rev_attr_train_A_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

// revtialling rev_attr_train_B 
// timeline
var trial_block_rev_attr_train_B_timeline = {
  ...trial_block_default_timeline,
  ...rev_attr_train_labels,
  data: {
    iat_type: 'rev_attr_train_B'
  }
};
// timeline_variables
var trial_block_rev_attr_train_B_timeline_variables = [];
for (var i = 0; i < category_info[4 + rdm].Word.length; i++) {
  trial_block_rev_attr_train_B_timeline_variables[i] = {
    stim_btn_association: "right",
    stim_word: category_info[4 + rdm].Word[i]
  };
}
for (var i = category_info[4 + rdm].Word.length; i < (category_info[4 + rdm].Word.length + category_info[5 - rdm].Word.length); i++) {
  trial_block_rev_attr_train_B_timeline_variables[i] = {
    stim_btn_association: "left",
    stim_word: category_info[5 - rdm].Word[i - category_info[4 + rdm].Word.length]
  };
}
// block obj
var trial_block_rev_attr_train_B = {
  timeline: [trial_block_rev_attr_train_B_timeline],
  timeline_variables: trial_block_rev_attr_train_B_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

// initialling instructions_block_incong blabla

// labels
var incong_labels = {
  left_category_label: [category_info[3 - rdm].Group, category_info[0 + rdm].Group],
  right_category_label: [category_info[2 + rdm].Group, category_info[1 - rdm].Group]
};

var instructions_block_incong = {
  ...instructions_block_default,
  ...incong_labels,
  pretrial_instructions: instr[0] +
    instr[4][4] +
    instr[5] +
    category_info[3 - rdm].Group + instr[6] + category_info[0 + rdm].Group + instr[7] +
    instr[5] +
    category_info[2 + rdm].Group + instr[6] + category_info[1 - rdm].Group + instr[8] +
    instr[9] + instr[11]
};

// initialling incong_practice_A 
// timeline
var trial_block_incong_prac_A_timeline = {
  ...trial_block_default_timeline,
  ...incong_labels,
  data: {
    iat_type: 'incong_practice_A'
  }
};
// timeline_variables 
var trial_block_incong_prac_A_timeline_variables = trial_block_target_concept_train_timeline_variables.concat(trial_block_rev_attr_train_A_timeline_variables);
// block obj
var trial_block_incong_prac_A = {
  timeline: [trial_block_incong_prac_A_timeline],
  timeline_variables: trial_block_incong_prac_A_timeline_variables,
  sample: {
    type: 'without-replacement',
    size: n_practice,
  }
};

// initialling incong_practice_B 
// timeline
var trial_block_incong_prac_B_timeline = {
  ...trial_block_default_timeline,
  ...incong_labels,
  data: {
    iat_type: 'incong_practice_B'
  }
};
// timeline_variables 
var trial_block_incong_prac_B_timeline_variables = trial_block_target_concept_train_timeline_variables.concat(trial_block_rev_attr_train_B_timeline_variables);
// block obj
var trial_block_incong_prac_B = {
  timeline: [trial_block_incong_prac_B_timeline],
  timeline_variables: trial_block_incong_prac_B_timeline_variables,
  sample: {
    type: 'without-replacement',
    size: n_practice,
  }
};

// initialling incong_test_A
// timeline
var trial_block_incong_test_A_timeline = {
  ...trial_block_default_timeline,
  ...incong_labels,
  data: {
    iat_type: 'incong_test'
  }
};
// timeline_variables 
var trial_block_incong_test_A_timeline_variables = trial_block_incong_prac_B_timeline_variables;
// block obj
var trial_block_incong_test_A = {
  timeline: [trial_block_incong_test_A_timeline],
  timeline_variables: trial_block_incong_test_A_timeline_variables,
  randomize_order: true,
  repetitions: 1
};

// initialling incong_test_B
// timeline
var trial_block_incong_test_B_timeline = {
  ...trial_block_default_timeline,
  ...incong_labels,
  data: {
    iat_type: 'incong_test_B'
  }
};
// timeline_variables 
var trial_block_incong_test_B_timeline_variables = trial_block_incong_prac_B_timeline_variables;
// block obj
var trial_block_incong_test_B = {
  timeline: [trial_block_incong_test_B_timeline],
  timeline_variables: trial_block_incong_test_B_timeline_variables,
  randomize_order: true,
  repetitions: 1
};


// nesting the blocks 
var block_target_concept = {
  timeline: [
    instructions_block_target_concept_train,
    trial_block_target_concept_train
  ],
  randomize_order: false,
};

var block_cong = {
  timeline: [
    instructions_block_ini_attr_train, 
    trial_block_ini_attr_train_A,
    trial_block_ini_attr_train_B,
    instructions_block_cong,
    trial_block_cong_prac_A,
    trial_block_cong_prac_B,
    trial_block_cong_test_A,
    trial_block_cong_test_B,
  ],
  randomize_order: false,
};

var block_incong = {
  timeline: [
    instructions_block_rev_attr_train,
    trial_block_rev_attr_train_A,
    trial_block_rev_attr_train_B,
    instructions_block_incong,
    trial_block_incong_prac_A,
    trial_block_incong_prac_B,
    trial_block_incong_test_A,
    trial_block_incong_test_B
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

var timeline = [];
timeline.push(groups_display);
// timeline.push(block_target_concept);
// timeline.push(block_cong_incong);



function saveDatatoDatabase() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../../data/experiment_database.php'); 
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response.success);
    }
  };
  xhr.send(jsPsych.data.get()
    .json());
}

function saveDatatoServer(name, data){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../../data/save_data_v1.php'); 
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filename: name, filedata: data}));
}





jsPsych.init({
  timeline: timeline,
  display_element: 'experiment_content',
  show_progress_bar: true,
  message_progress_bar: ' ',
  auto_update_progress_bar: false,
  on_finish: function() {
	 // saveDatatoDatabase;
	 saveDatatoServer( userInfo.uuid() + "_experiment_data_" + userInfo.timestamp, jsPsych.data.get().json() );
    // jsPsych.data.get().localSave('json', userInfo.uuid() + '.txt');
    var all_data = jsPsych.data.get();
    console.log(all_data.csv());
	// compute some simple results
    // mean RT
    var cong_test_mean = jsPsych.data.get()
      .filter([
        {
          iat_type: 'cong_test_A'
        }, {
          iat_type: 'cong_test_B'
        }
    ])
      .filterCustom(function(x) {
        return x.rt < 10000
      });
    var mean_correct_responses_cong_test = cong_test_mean.filter({
        correct: true
      })
      .select('rt')
      .mean();
    var incong_test_mean = jsPsych.data.get()
      .filter([
        {
          iat_type: 'incong_test_A'
        }, {
          iat_type: 'incong_test_B'
        }
    ])
      .filterCustom(function(x) {
        return x.rt < 10000
      });
    var mean_correct_responses_incong_test = incong_test_mean.filter({
        correct: true
      })
      .select('rt')
      .mean();
    // overall sd
    var sd = cong_test_mean.join(incong_test_mean)
      .filter({
        correct: true
      })
      .select('rt')
      .sd();
    var d = (mean_correct_responses_incong_test - mean_correct_responses_cong_test) / sd;
	// send user to info page based on the results
    setTimeout(function() {
      window.location.href = './information.html?uuid=' + userInfo.uuid() + '&cong_rt=' + Math.floor(mean_correct_responses_cong_test) + '&incong_rt=' + Math.floor(mean_correct_responses_incong_test)
    }, 200);
    var exp_end = '<div class="text_m"><br>';
    exp_end += '<p class="text_l fade-in">结果保存中，请稍候...</p><br>';
    document.body.innerHTML = exp_end;

  }
});

