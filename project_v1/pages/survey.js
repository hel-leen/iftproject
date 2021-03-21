// theme colors
var defaultThemeColors = Survey
  .StylesManager
  .ThemeColors["modern"];
defaultThemeColors["$main-color"] = "#556677";
defaultThemeColors["$answer-background-color"] = "rgba(126, 129, 188, 0.2);";

// complete page
var myCss = {
  "completedPage": "",
  "comment": "survey_comment",
  "row": "survey_row",
  "paneldynamic": {
		"title": "survey_question_title",
  },
  	"question": {
		"header": "survey_question_header",
		"title": "survey_question_title",
	}

};

Survey
  .StylesManager
  .applyTheme();

Survey
  .StylesManager
  .applyTheme("modern");
// .applyTheme("bootstrapmaterial");
Survey.settings.lazyRowsRendering = true;


// page index  (ignored)
function doOnCurrentPageChanged(survey) {
  document
    .getElementById('pageSelector')
    .value = survey.currentPageNo;
  document
    .getElementById('surveyPrev')
    .style
    .display = !survey.isFirstPage ?
    "inline" :
    "none";
  document
    .getElementById('surveyNext')
    .style
    .display = !survey.isLastPage ?
    "inline" :
    "none";
  document
    .getElementById('surveyComplete')
    .style
    .display = survey.isLastPage ?
    "inline" :
    "none";
  document
    .getElementById('surveyProgress')
    .innerText = "Page " + (
      survey.currentPageNo + 1) + " of " + survey.visiblePageCount + ".";
  if (document.getElementById('surveyPageNo'))
    document
    .getElementById('surveyPageNo')
    .value = survey.currentPageNo;
}

function setupPageSelector(survey) {
  var selector = document.getElementById('pageSelector');
  for (var i = 0; i < survey.visiblePages.length; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = "Page " + (
      i + 1);
    selector.add(option);
  }
}



var survey_date = new Date();
var primingType;
if (new Date()
  .toISOString()
  .slice(-4, -3) < 2) {
  primingType = 0;
} else if (new Date()
  .toISOString()
  .slice(-4, -3) < 6) {
  primingType = 1;
} else {
  primingType = 2;
}
console.log("priming type:", primingType);


var userInfo = {
  url: window.location.href,
  uuid: function() {
    if (this.url.indexOf("uuid=") < 0) {
      return "null_id";
    } else {
      return this.url.slice(this.url.indexOf("uuid=") + 5, );
    }
  },
  timestamp: survey_date.getTime(),
}
console.log(userInfo.uuid())
var experiment_page = './experiment.html?uuid=' + userInfo.uuid();


$.getJSON('https://api.ipify.org/?format=json', function(data) {
  ip = data.ip;
  $("#sq_102i")
    .val(data.ip);
  console.log(ip);
});




// some choices
let yob = [];
yob.push("1920及更早");
for (var i = 1920; i < 2004; i++) {
  yob.push(i);
};
yob.push("2004及以后");
let ladder = [];
for (var i = 1; i < 11; i++) {
  ladder.push(i);
};

let provinces = ["北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "四川省", "贵州省", "云南省", "陕西省", "甘肃省", "青海省", "新疆维吾尔自治区", "西藏自治区", "宁夏回族自治区", "香港", "澳门", "台湾"];


function surveyValidateQuestion(s, options) {
  if (options.name == 'none_ms_imagine' || options.name == 'ms_imagine') {
    if (!options.value) {
      options.error = "你还没有填写此问题";
    }
    else {
      if (options.value.search(/["我感觉平静心安愿忧惧憾悲情冷落生死怕苦笑意幸福真善爱喜气难受顺利思自负世道欢快乐高重如忍默容恶执守怀悦惊泪烦知虚疲弱困境美妙孤单欣慰"]/i) < 0) {
        options.error = "你好像没有在描述中提及自己的感受，请尽可能把你在想象场景中体会到的情绪描述出来";
      }
      if (options.value.length < 30) {
        options.error = "你的描述好像有点太简短了，请尽可能详细地描述细节";
      }
      if (options.value.length > 1800) {
        options.error = "你的描述好像有点太长了，请删去一部分再试";
      }
    }
  }
}

// value to split the survey into halves

var rdm = Math.floor((Math.random() * 2));
var question_visible_1 = [true, false][rdm];
var question_visible_2 = [false, true][rdm];
console.log(question_visible_1, question_visible_2);

var json = {
  "title": " IFT ",
  "description": "IAT for TMT Project",
  "locale": "en-us",
  "locale": "zh-cn",
  "logo": "../resources/IFT.png",
  "min-width": "220px",
  "logoWidth": 64,
  "logoHeight": 64,
  "logoPosition": "right",
  "completedHtml": {
    "zh-cn": "<br><p class='sv_instruction' style = 'width: 100%; height: 200px;  display: inline-grid;   justify-content: center;  align-items: center;  text-align: center;'>感谢完成调查！<br><br>实验正在加载，请稍候... </div>"
  },
  "completedHtmlOnCondition": [{}],

  "pages": [{
      "name": "presurvey_instructions",
      "visible": true, //no toggle
      "isRequired": false,
      "elements": [{
          "type": "html",
          "name": "demograph_intro",
          "html": "<p class='sv_instruction'>下面你需要填写一份问卷，请在<b>安静的环境下</b>完成本部分内容。<br><br>在填写过程中，请<b style='color: #661122;'>不要</b>点击后退/返回键或刷新页面，否则问卷内容将会全部重新加载。<br>当每页题目全部填写完毕后，页面将自动进入下一页。<br><br>如果你已准备好，请点击右下方的<b style='color: #223366;'>下一页</b>按钮开始填写问卷。<br></p></div>"
        },
		        {
          "type": "text",
          "name": "uuid",
          "visible": false,
          "defaultValue": userInfo.uuid(),
        },
        {
          "type": "text",
          "name": "IP",
          "visible": false, // no toggle
        },
        {
          "type": "text",
          "name": "survey_date",
          "visible": false, // no toggle
          "defaultValue": survey_date,
        },
        {
          "type": "text",
          "name": "Priming_type",
          "visible": false, // no toggle
          "defaultValue": primingType,
        },
          ],
          "choicesFromQuestionMode": "selected"

    },
	{
      "name": "Demographics",
      "visible": true, //no toggle
      "isRequired": false,
      "elements": [{
          "type": "html",
          "name": "demograph_intro",
          "html": "<p class='sv_instruction'>以下部分将询问你的个人相关信息，以便我们在研究中比较不同人群之间的差异。<br></p></div>"
        },
        {
          "isRequired": false,
          "type": "radiogroup",
          "name": "gender",
          "title": {
            "en-us": "What is your gender?",
            "zh-cn": "请选择你的性别："
          },

          "choices": [{
              "value": "2",
              "text": {
                "en-us": "Male",
                "zh-cn": "男性"
              }
            },
            {
              "value": "1",
              "text": {
                "en-us": "Female",
                "zh-cn": "女性"
              }
            },
            {
              "value": "3",
              "text": {
                "en-us": "Non-binary or Other",
                "zh-cn": "非二元性别或其他"
              }
            },

          ]
        },
        {
          "isRequired": false,
          "type": "dropdown",
          "name": "birthyear",
          "title": {
            "en-us": "Please indicate the year of your birth.",
            "zh-cn": "请选择你的出生年份："
          },
          "choices": yob.reverse(),
        },
        {
          "isRequired": false,
          "type": "dropdown",
          "name": "region",
          "title": "请选择你居住的省份: ",
          "choices": provinces,

        },
        {
          "isRequired": false,
          "type": "radiogroup",
          "name": "city",
          "title": {
            "en-us": "City",
            "zh-cn": "你的主要居住地属于哪种区域？"
          },
          "hideNumber": true,
          "choices": [{
              "value": "1",
              "text": {
                "zh-cn": "农村"
              }
            },
            {
              "value": "2",
              "text": {
                "zh-cn": "集镇"
              }
            },
            {
              "value": "3",
              "text": {
                "zh-cn": "城市"
              }
            }
          ]
        },
        {
          "isRequired": false,
          "type": "radiogroup",
          "name": "ethnic",
          "title": {
            "en-us": "Which of the following best characterizes your ethnicity?",
            "zh-cn": "你的民族是？"
          },

          "choices": [{

              "value": "7",
              "text": {

                "zh-cn": "汉族"
              }
            },
            {
              "value": "1",
              "text": {

                "zh-cn": "蒙古族"
              }
            },
            {
              "value": "2",
              "text": {

                "zh-cn": "满族"
              }
            },
            {
              "value": "3",
              "text": {

                "zh-cn": "回族"
              }
            },
            {
              "value": "4",
              "text": {

                "zh-cn": "藏族"
              }
            },
            {
              "value": "5",
              "text": {

                "zh-cn": "壮族"
              }
            },
            {
              "value": "6",
              "text": {

                "zh-cn": "维族"
              }
            },

            {
              "value": "8",
              "text": {
                "en-us": "Unknown",
                "zh-cn": "不确定"
              }
            }
          ],
          "hasOther": true
        },
        {
          "isRequired": false,
          "type": "dropdown",
          "name": "edu",
          "title": {
            "en-us": "Please indicate the highest level of education that you have completed.",
            "zh-cn": "到目前为止，你所获取的最高学历是？"
          },

          "choices": [{
              "value": "1",
              "text": {
                "en-us": "Elementary school",
                "zh-cn": "小学及以下"
              }
            },
            {
              "value": "2",
              "text": {
                "en-us": "Junior high school",
                "zh-cn": "初中"
              }
            },
            {
              "value": "3",
              "text": {
                "en-us": "High school",
                "zh-cn": "高中（含高职、中专、技校等）"
              }
            },
            {
              "value": "4",
              "text": {
                "en-us": "Associate's degree",
                "zh-cn": "大学专科（含自考、成教、专升本等）"
              }
            },
            {
              "value": "5",
              "text": {
                "en-us": "Bachelor's degree",
                "zh-cn": "大学本科"
              }
            },
            {
              "value": "6",
              "text": {
                "en-us": "Master's degree",
                "zh-cn": "硕士研究生及以上"
              }
            },
          ]
        },
        {
          "isRequired": false,
          "type": "dropdown",
          "name": "fieldofstudy",
          "visibleIf": "{edu} > 4",
          "title": {
            "en-us": "Please indicate the major field of study for your most advanced degree or degree you are currently pursuing:",
            "zh-cn": "你获取的最高学历属于哪种学科？"
          },

          "choices": [{
              "value": "1",
              "text": "基础科学"
            },
            {
              "value": "2",
              "text": "工程科技"
            },
            {
              "value": "3",
              "text": "农业科技"
            },
            {
              "value": "4",
              "text": "医药卫生科技"
            },
            {
              "value": "5",
              "text": "哲学与人文科学"
            },
            {
              "value": "6",
              "text": "社会科学"
            },
            {
              "value": "7",
              "text": "信息科技"
            },
            {
              "value": "8",
              "text": "经济与管理科学"
            },
            {
              "value": "999999",
              "text": "不确定或其它情况"
            },
          ]
        },
        {
          "isRequired": false,
          "type": "dropdown",
          "name": "employment",
          "title": {
            "en-us": "Which of the following best characterizes your employment status?",
            "zh-cn": "你当前的职业状况是？"
          },

          "choices": [{
              "value": "1",
              "text": {
                "en-us": "Employer",
                "zh-cn": "自己是雇佣者或创业者"
              }
            },
            {
              "value": "2",
              "text": {
                "en-us": "Employed for wages",
                "zh-cn": "有固定职业(受雇于他人)"
              }
            },
            {
              "value": "3",
              "text": {
                "en-us": "Self-employed",
                "zh-cn": "自由职业者"
              }
            },
            {
              "value": "4",
              "text": {
                "en-us": "Out of work ( whether currently looking for work or not)",
                "zh-cn": "曾就业，当前正待业"
              }
            },
            {
              "value": "5",
              "text": {
                "en-us": "Retired",
                "zh-cn": "已退休"
              }
            },
            {
              "value": "6",
              "text": {
                "en-us": "A homemaker",
                "zh-cn": "全职主妇/主夫"
              }
            },
            {
              "value": "7",
              "text": {
                "en-us": "A student",
                "zh-cn": "学生"
              }
            },
            {
              "value": "8",
              "text": {
                "en-us": "Other",
                "zh-cn": "无劳动能力"
              }
            },
            {
              "value": "999999",
              "text": {
                "en-us": "Unable to work",
                "zh-cn": "其它情况"
              }
            }
          ]
        },
        {
          "isRequired": false,
          "type": "dropdown",
          "name": "relationship",
          "title": {
            "en-us": "Which of the following best characterizes your relationship status?",
            "zh-cn": "以下哪一项描述最符合你的婚恋状况？"
          },
          "hideNumber": true,
          "choices": [{
              "value": "1",
              "text": {
                "en-us": "Single",
                "zh-cn": "单身"
              }
            },
            {
              "value": "2",
              "text": {
                "en-us": "In a relationship",
                "zh-cn": "恋爱中"
              }
            },
            {
              "value": "3",
              "text": {
                "en-us": "Married",
                "zh-cn": "已婚"
              }
            },
            {
              "value": "4",
              "text": {
                "en-us": "Separated",
                "zh-cn": "离婚/分居"
              }
            },

            {
              "value": "5",
              "text": {
                "en-us": "Widowed",
                "zh-cn": "丧偶"
              }
            },
            {
              "value": "999999",
              "text": {
                "en-us": "Other",
                "zh-cn": "其它情况"
              }
            }
          ]
        },
        {
          "isRequired": false,
          "type": "radiogroup",
          "name": "religiosity",
          "title": {
            "en-us": "Please indicate the degree of your religiosity.",
            "zh-cn": "你是否信仰宗教？"
          },
          "hideNumber": true,
          "choices": [{
              "value": "1",
              "text": {
                "en-us": "I am not at all religious",
                "zh-cn": "不信仰宗教"
              }
            },
            {
              "value": "2",
              "text": {
                "en-us": "I am somewhat religious",
                "zh-cn": "有一点信仰宗教"
              }
            },
            {
              "value": "3",
              "text": {
                "en-us": "I am moderately religious",
                "zh-cn": "比较信仰宗教"
              }
            },
            {
              "value": "4",
              "text": {
                "en-us": "I am very religious",
                "zh-cn": "非常信仰宗教"
              }
            }
          ]
        },
        {
          "isRequired": false,
          "type": "dropdown",
          "name": "religion",
          "visibleIf": "{religiosity} > 1",
          "title": {
            "en-us": "Please indicate your religious affiliation: ",
            "zh-cn": "你的宗教信仰是："
          },
          "choices": [{
              "value": "1",
              "text": {
                "en-us": "Buddhism",
                "zh-cn": "佛教"
              }
            },
            {
              "value": "2",
              "text": {
                "en-us": "Taoism",
                "zh-cn": "道教"
              }
            },
            {
              "value": "3",
              "text": {
                "en-us": "Chinese Folk Religion",
                "zh-cn": "民间信仰（拜妈祖、关公等）"
              }
            },
            {
              "value": "4",
              "text": {
                "en-us": "Islam",
                "zh-cn": "伊斯兰教/回教"
              }
            },
            {
              "value": "5",
              "text": {
                "zh-cn": "天主教",
                "en-us": "Catholicism"
              }
            },
            {
              "value": "6",
              "text": {
                "en-us": "Protestantism",
                "zh-cn": "基督教"
              }
            },
            {
              "value": "7",
              "text": {
                "en-us": "Orthodox",
                "zh-cn": "东正教"
              }
            },
            {
              "value": "8",
              "text": {
                "en-us": "Other Christian belief",
                "zh-cn": "其他基督教"
              }
            },
            {
              "value": "9",
              "text": {
                "zh-cn": "犹太教",
                "en-us": "Judaism"
              }
            }
          ],
          "hasOther": true
        },
        {
          "isRequired": false,
          "type": "dropdown",
          "name": "nonreligion",
          "visibleIf": "{religiosity} == 1",
          "title": {
            "en-us": "Which of the following best characterizes your idea about religion? ",
            "zh-cn": "以下哪一项描述最符合你对宗教信仰的态度？"
          },

          "choices": [{
              "value": "76",
              "text": {
                "en-us": "Non-Religion - Atheist",
                "zh-cn": "无神论/唯物主义/不相信鬼神存在"
              }
            },
            {
              "value": "75",
              "text": {
                "en-us": "Non-Religion - Agnostic",
                "zh-cn": "不可知论/不清楚是否有鬼神存在"
              }
            },
            {
              "value": "77",
              "text": {
                "en-us": "Other non-religion",
                "zh-cn": "其它非宗教信仰态度"
              }
            }
          ],
          "choicesFromQuestionMode": "selected"
        }
      ],
      "title": "General Info",
    },
    {
      "name": "SES",
      "visible": true, //toggle
      "elements": [{
          "type": "html",
          "name": "ses_intro",
          "html": "<p class='sv_instruction' style='color: black; font-size: 1.16em;'>请想象下图中的梯子代表了我们社会中人们的位置：<br>最高 “10 ”代表<b>最顶层</b>——那里的人们拥有最多的财富、最受尊敬的地位；最低“1 ”代表<b>最底层</b>——那里的人们拥有最少的财富、最不受尊敬的地位。在梯子上的位置越高，表示社会地位越高，反之则表示社会地位越低。<br> <big style='font-size: large;'><b>相对于社会中的其他人来说，你认为自己位于梯子中的那一层呢？</b></big> <br><br> 请从以下“1”到“10”的数字中选择一个来代表你<b>当前</b>所在的等级：</p>"
        },
        {
          "type": "panel",
          "name": "ses_ladder_page_container_panel",
          "elements": [{
              "isRequired": false,
              "type": "radiogroup",
              "name": "ses_scale",
              "width": "15vw",
              "title": " ",
              "titleLocation": "hidden",
              "choices": ladder.reverse(),
            },
            {
              "type": "html",
              "name": "ladder",
              // "width": "60vw",
              "startWithNewLine": false,
              "html": "<img src= \"../resources/stimuli/ladder.png\" style=\"border: 0px solid blue; margin-top: 0px; margin-left: 20vw; \"</img>"
            },
          ],
          "width": "100%"
        },
        {
          "type": "html",
          "name": "ses_intro_past",
          "titleLocation": "hidden",
          "html": "<p class='sv_instruction' style='color: black; font-size: 1.1em;'> 请从以下“1”到“10”的数字中选择一个来代表你在<b>十年前</b>所在的等级：</p>"
        },
        {
          "isRequired": false,
          "type": "dropdown",
          "name": "ses_scale_past",
          "titleLocation": "hidden",
          "title": " ",
          "choices": ladder.reverse()
        },
        {
          "type": "html",
          "name": "ses_intro_child",
          "html": "<p class='sv_instruction' style='color: black; font-size: 1.1em;'> 请从以下“1”到“10”的数字中选择一个来代表你<b>14岁时</b>家庭所在的等级：</p>"
        },
        {
          "isRequired": false,
          "type": "dropdown",
          "name": "ses_scale_child",
          "titleLocation": "hidden",
          "title": " ",
          "choices": ladder.reverse()
        },
        {
          "type": "text",
          "name": "income",
          "title": {
            "zh-cn": "你在去年一年中个人总收入是多少（单位：元）？"
          },
          "inputType": "number",
          "autoComplete": "10000",
          "min": "0",
          "step": 10000,
          "textUpdateMode": "onBlur",
          "placeHolder": "请直接填写数字 "
        },
        {
          "type": "html",
          "name": "ses_intro_current",
          "html": {
            "zh-cn": "<br><p class='sv_instruction'>请对以下说法是否符合你的实际情况进行评分。<br></p><p class='sv_description'>“1”分代表“完全不符合”，<br>“2”分代表“较不符合”，<br>“3”分代表“说不清”，<br>“4”分代表“比较符合”，<br>“5”分代表“完全符合”。</p>"
          }
        },
        {
          "type": "rating",
          "name": "SES1",
          "title": {
            "zh-cn": "现在我有足够的钱购买我想要的东西。"
          },
        },
        {
          "type": "rating",
          "name": "SES2",
          "title": {
            "zh-cn": "现在我不会对我的支付能力感到担心。"
          }
        },
        {
          "type": "rating",
          "name": "SES3",
          "title": {
            "zh-cn": "我并不会为未来的经济能力感到担心。"
          }
        }
      ]
    },
    {
      "name": "covid",
      "visible": true, //toggle
      "elements": [{
          "type": "html",
          "visibleIf": "{priming_type} < 2",
          "name": "covid_intro",
          "html": {
            "en-us": "<br><p class='sv_instruction'>In this task you will be asked questions about your experiences with COVID-19. <br>COVID-19, the disease caused by the virus SARS-CoV-2, was declared a pandemic by the World Health Organization Director-General on 11 March 2020. In countries most severely impacted by the disease, case fatality rates are thought to be as high as 15%. Due to its contagiousness, COVID-19 poses both a physical threat, causing more than 2 million deaths worldwide, and also a psychological threat through the fear it provokes. </div>",
            "zh-cn": "<br><p class='sv_instruction'>以下部分将询问你在新冠疫情中的个人经历，以了解你在疫情中受到影响的程度与方式。请你回想自己的有关经历与实际状况，并回答以下问题。</div>",
          }

        },
        {
          "type": "html",
          "visibleIf": "{priming_type} > 1",
          "name": "covid_intro",
          "html": {
            "en-us": "<br><p class='sv_instruction'>In this task you will be asked questions about your experiences with COVID-19. <br>COVID-19, the disease caused by the virus SARS-CoV-2, was declared a pandemic by the World Health Organization Director-General on 11 March 2020. In countries most severely impacted by the disease, case fatality rates are thought to be as high as 15%. Due to its contagiousness, COVID-19 poses both a physical threat, causing more than 2 million deaths worldwide, and also a psychological threat through the fear it provokes. </div>",
            "zh-cn": "<br><p class='sv_instruction'>以下部分将询问你在新冠疫情中的个人经历。<br>2019冠状病毒病（COVID-19）是一种由严重急性呼吸系统综合症冠状病毒2型引发的传染病。自2019年末起，此病在全球各国大规模爆发并急速扩散，成为人类历史上致死人数最多的流行病之一。截至2021年2月底，全球已有192个国家和地区累计报告超过1.11亿名确诊病例，逾247.6万名患者死亡。与此同时，新冠疫情也对人们的心理健康造成了威胁。因此，我们希望了解你在疫情中受到影响的程度与方式。请你回想自己的有关经历与实际状况，并回答以下问题。</div>",
          }

        },
        {
          "type": "boolean",
          "name": "covidinfect",
          "isRequired": false,
          "title": {
            "en-us": "Have you been diagnosed with COVID-19?",
            "zh-cn": "你是否曾被确诊为感染新冠病毒？"
          },
        },
        {
          "isRequired": false,
          "type": "boolean",
          "name": "covidinfect_family",
          "title": {
            "en-us": "Have any of your family members been diagnosed with COVID-19?",
            "zh-cn": "你是否有家人曾被确诊为感染新冠病毒？"
          },
        }
      ],
      "title": "Covid diagnose"
    },
    {
      "name": "covidpos",
      "visibleIf": "{covidinfect} == false",
      "elements": [{
          "type": "html",
          "visible": false,
          "name": "covidpos_intro",
          "html": "<br><p class='sv_instruction'>CDC suggests that people over 65, those struggling with heart and lung disease, those who are immunocompromised (suppressed immune system), those who are obese, those with diabetes, and others are at high risk for serious illness. </div>"
        },
        {
          "isRequired": false,
          "type": "radiogroup",
          "name": "covidrisk",
          "title": {
            "en-us": "Do you consider yourself at high risk for serious illness following infection of COVID-19?",
            "zh-cn": "你认为自己是否属于感染新冠病毒的高危人群？"
          },
          "choices": [{
              "value": "3",
              "text": {
                "en-us": "Yes",
                "zh-cn": "是"
              }
            },
            {
              "value": "1",
              "text": {
                "en-us": "No",
                "zh-cn": "否"
              }
            },
            {
              "value": "2",
              "text": {
                "en-us": "Not sure",
                "zh-cn": "不确定"
              }
            }
          ]
        },
        {
          "isRequired": false,
          "type": "radiogroup",
          "name": "covidpossib",
          "title": {
            "en-us": "How likely are you to get COVID-19",
            "zh-cn": "你认为自己有多大可能感染新冠病毒？"
          },
          "choices": [{
              "value": "1",
              "text": {
                "en-us": "I definitely will not",
                "zh-cn": "绝对不可能"
              }
            },
            {
              "value": "2",
              "text": {
                "en-us": "I probably will not",
                "zh-cn": "很不可能"
              }
            },
            {
              "value": "3",
              "text": {
                "en-us": "I might not",
                "zh-cn": "不太可能"
              }
            },
            {
              "value": "4",
              "text": {
                "en-us": "I am unsure",
                "zh-cn": "不能确定是否可能"
              }
            },
            {
              "value": "5",
              "text": {
                "en-us": "I might",
                "zh-cn": "似乎有可能"
              }
            },
            {
              "value": "6",
              "text": {
                "en-us": "I probably will",
                "zh-cn": "很有可能"
              }
            },
            {
              "value": "7",
              "text": {
                "en-us": "I definitely will",
                "zh-cn": "肯定会"
              }
            }
          ]
        },
        {
          "isRequired": false,
          "type": "radiogroup",
          "name": "covidworry",
          "title": {
            "en-us": "You are worried about your COVID-19 risk?",
            "zh-cn": "你是否担心自己感染新冠病毒的风险？"
          },
          "choices": [{
              "value": "1",
              "text": {
                "en-us": "Strongly disagree",
                "zh-cn": "完全不担心"
              }
            },
            {
              "value": "2",
              "text": {
                "en-us": "Moderately disagree",
                "zh-cn": "几乎不担心"
              }
            },
            {
              "value": "3",
              "text": {
                "en-us": "Slightly disagree",
                "zh-cn": "不是太担心"
              }
            },
            {
              "value": "4",
              "text": {
                "en-us": "Neither agree nor disagree",
                "zh-cn": "不确定"
              }
            },
            {
              "value": "5",
              "text": {
                "en-us": "Slightly agree",
                "zh-cn": "有点担心"
              }
            },
            {
              "value": "6",
              "text": {
                "en-us": "Moderately agree",
                "zh-cn": "很担心"
              }
            },
            {
              "value": "7",
              "text": {
                "en-us": "Strongly agree",
                "zh-cn": "极度担心"
              }
            }
          ]
        },
        {
          "isRequired": false,
          "type": "radiogroup",
          "name": "covidinfere",
          "title": {
            "en-us": "COVID-19 is affecting people in different ways. Please indicate in what ways the following areas of your life have been disrupted as a result of COVID-19.",
            "zh-cn": "疫情对许多人造成了不同程度的影响。你的日常生活是否因疫情产生了变化？请从以下描述中选择最符合你实际情况的一项："
          },
          "choices": [{
              "value": "1",
              "text": {
                "en-us": "Extreme positive change",
                "zh-cn": "非常正面的变化"
              }
            },
            {
              "value": "2",
              "text": {
                "en-us": "Moderate positive change",
                "zh-cn": "比较正面的变化"
              }
            },
            {
              "value": "3",
              "text": {
                "zh-cn": "有一点正面的变化",
                "en-us": "Minimal positive change"
              }
            },
            {
              "value": "4",
              "text": {
                "zh-cn": "没什么变化",
                "en-us": "No change"
              }
            },
            {
              "value": "5",
              "text": {
                "zh-cn": "有一点负面的变化",
                "en-us": "Minimal negative change"
              }
            },
            {
              "value": "6",
              "text": {
                "zh-cn": "比较负面的变化",
                "en-us": "Moderate negative change"
              }
            },
            {
              "value": "7",
              "text": {
                "zh-cn": "非常负面的变化",
                "en-us": "Extreme negative change"
              }
            },
            {
              "value": "999999",
              "text": {
                "zh-cn": "题目不适用",
                "en-us": "Does not apply"
              }
            }
          ]
        },
        {
          "isRequired": false,
          "type": "radiogroup",
          "name": "covid_anxiety",
          "title": {
            "zh-cn": "在疫情中，许多人因为不同原因产生了焦虑情绪。你是否因为疫情或者因为它对你生活的影响产生过焦虑情绪？",
            "en-us": "People become anxious for lots of different reasons. Have you experienced moderate to severe anxiety about the coronavirus and its impact on your life? "
          },

          "choices": [{
              "value": "1",
              "text": {
                "en-us": "Yes",
                "zh-cn": "是"
              }
            },
            {
              "value": "2",
              "text": {
                "en-us": "No",
                "zh-cn": "否"
              }
            }
          ]
        },
        {
          "isRequired": false,
          "type": "radiogroup",
          "name": "covid_anxietydeg",
          "title": {
            "en-us": "To what extent have you experienced moderate to severe anxiety about the coronavirus and its impact on your life? ",
            "zh-cn": "你体验到的焦虑情绪程度如何？"
          },
          "visibleIf": "{covid_anxiety} == 1",
          "choices": [{
              "value": "1",
              "text": {
                "en-us": "Slightly",
                "zh-cn": "非常轻度"
              }
            },
            {
              "value": "2",
              "text": {
                "en-us": "Somewhat",
                "zh-cn": "程度较轻"
              }
            },
            {
              "value": "3",
              "text": {
                "en-us": "Moderate",
                "zh-cn": "中等程度"
              }
            },
            {
              "value": "4",
              "text": {
                "en-us": "Very Much",
                "zh-cn": "程度较重"
              }
            },
            {
              "value": "5",
              "text": {
                "en-us": "Extremely",
                "zh-cn": "非常严重"
              }
            }
          ]
        }
      ],
    },
    {
      "name": "MS",
      "visible": true, //toggle
      "elements": [{
          "type": "html",
          "name": "demograph_intro",
          "html": "<br><p class='sv_instruction'>以下部分将请你想象一些场景，以便为进入下一步实验作准备。</div>"
        },
        {
          "type": "comment",
          "name": "ms_imagine",
          "visibleIf": "{priming_type} <2",
          "title": "假如你正在经历非常严重的牙痛，请想象这一场景和你在当时的感受，并在下面描述出来。表达的方式不限，但希望你能深入思考和体会、尽可能详细地描述细节。 ",
          "isRequired": true, //no toggle
          "validators": [{
            "type": "text",
            "minLength": 30,
            // "maxLength": 3000,
            "allowDigits": true
          }],
          "placeHolder": "请在这里描述想象的场景和感受。",
          "min-height": "15em",
        },
        {
          "type": "comment",
          "name": "none_ms_imagine",
          "visibleIf": "{priming_type} >1",
          "title": "请想象你临终前的场景和你在当时的感受，并在下面描述出来。表达的方式不限，但希望你能深入思考和体会、尽可能详细地描述细节。 ",
          "isRequired": true,
          "validators": [{
            "type": "text",
            "minLength": 30,
            // "maxLength": 3000,
            "allowDigits": true
          }],
          "placeHolder": "请在这里描述想象的场景和感受。",
          "min-height": "15em",
        }
      ]
    },
    {
      "name": "PANAS",
      "visible": true, //toggle on demand
      "elements": [{
          "type": "html",
          "name": "PANAS_intro",
          "html": {
            "zh-cn": "<p class='sv_instruction' style='margin-top: 0.5em;'>以下部分与你当前的情绪状况有关。请阅读以下形容情绪的词语，逐一评价它们在你当前情绪中占有的比例。</p><p class='sv_description'>“1”分代表“几乎没有”，<br>“2”分代表“比较少”，<br>“3”分代表“中等程度”，<br>“4”分代表“比较多”，<br>“5”分代表“极其多”。</p>"
          }
        },
        {
          "type": "panel",
          "name": "PANAS_container_panel_A",
          "visible": question_visible_1,
          "elements": [

            {
              "type": "rating",
              "name": "PANAS01",
              "title": {
                "zh-cn": "兴奋的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS02",
              "title": {
                "zh-cn": "坐立不安的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS03",
              "title": {
                "zh-cn": "感兴趣的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS04",
              "title": {
                "zh-cn": "心烦的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS05",
              "title": {
                "zh-cn": "强大的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS06",
              "title": {
                "zh-cn": "内疚的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS07",
              "title": {
                "zh-cn": "惊恐的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS08",
              "title": {
                "zh-cn": "敌意的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS09",
              "title": {
                "zh-cn": "充满热情的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS10",
              "title": {
                "zh-cn": "自豪的"
              }
            }
          ],
          "questionsOrder": "random",
        },
        {
          "type": "panel",
          "name": "PANAS_container_panel_B",
          "visible": question_visible_2,
          "elements": [{
              "type": "rating",
              "name": "PANAS11",
              "title": {
                "zh-cn": "易怒的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS12",
              "title": {
                "zh-cn": "警觉的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS13",
              "title": {
                "zh-cn": "羞愧的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS14",
              "title": {
                "zh-cn": "受鼓舞的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS15",
              "title": {
                "zh-cn": "紧张的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS16",
              "title": {
                "zh-cn": "意志坚定的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS17",
              "title": {
                "zh-cn": "专注的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS18",
              "title": {
                "zh-cn": "心神不宁的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS19",
              "title": {
                "zh-cn": "充满活力的"
              }
            },
            {
              "type": "rating",
              "name": "PANAS20",
              "title": {
                "zh-cn": "害怕的"
              }
            }
          ],
          "questionsOrder": "random",
        },
      ]
    },

    {
      "name": "LES",
      "visible": true, //toggle
      "elements": [{
          "type": "html",
          "name": "LES_intro",
          "html": "<p class='sv_instruction' style='margin-top: 0.5em;'>以下部分与你的成长经历有关。请回忆你的14岁之前的经历，然后评价以下说法是否符合你的成长经历的实际情况。</p><p class='sv_description'>“1”分代表“完全不符合”，<br>“2”分代表“较不符合”，<br>“3”分代表“说不清”，<br>“4”分代表“比较符合”，<br>“5”分代表“完全符合”。</p>"
        },
        {
          "type": "panel",
          "name": "LES_container_panel",
          "questionsOrder": "random",
          "elements": [{
              "type": "rating",
              "name": "SES_C1",
              "title": {
                "zh-cn": "我成长于一个相对富有的社区/村庄。"
              }
            },
            {
              "type": "rating",
              "name": "SES_C2",
              "title": {
                "zh-cn": "与其他孩子相比，我觉得我相对而言更加富有。"
              }
            },
            {
              "type": "rating",
              "name": "SES_C3",
              "title": {
                "zh-cn": "在我成长过程中，我的家庭通常有足够的钱来购买所需物品。"
              }
            },
            {
              "type": "rating",
              "name": "SES_C4",
              "title": {
                "zh-cn": "在我成长过程中，我有足够的资源做我想做的事。"
              }
            },
            {
              "type": "rating",
              "name": "LES1",
              "title": {
                "zh-cn": "在我成长过程中，我的父亲具有稳定长期的工作。"
              }
            },
            {
              "type": "rating",
              "name": "LES2",
              "title": {
                "zh-cn": "在我成长过程中，我的母亲具有稳定长期的工作。"
              }
            },
            {
              "type": "rating",
              "name": "LES3",
              "title": {
                "zh-cn": "在我成长过程中，我的家庭拥有固定的住所。"
              }
            },
            {
              "type": "rating",
              "name": "LES4",
              "title": {
                "zh-cn": "在我成长过程中，我的家庭经常搬家。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "LES5",
              "title": {
                "zh-cn": "在我成长过程中，我的父母婚姻状态非常和谐稳定。"
              }
            },
            {
              "type": "rating",
              "name": "LES",
              "title": {
                "zh-cn": "在我成年以前，我的父母已分居/离婚。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            }
          ],
          "questionsOrder": "random",
        },
      ]
    },
    {
      "name": "SQ",
      "visible": true, //toggle
      "elements": [{
          "type": "html",
          "name": "SQ_intro",
          "html": "<p class='sv_instruction' style='margin-top: 0.5em;'>以下部分与你的个性特点有关。请阅读以下说法，并逐一评价它们是否符合你的实际情况。</p><p class='sv_description'>“1”分代表“完全不符合”，<br>“2”分代表“较不符合”，<br>“3”分代表“说不清”，<br>“4”分代表“比较符合”，<br>“5”分代表“完全符合”。</p>"
        },
        {
          "type": "panel",
          "name": "AAS_container_panel_A",
          "visible": question_visible_2,
          "elements": [{
              "type": "rating",
              "name": "AAS_SC01",
              "title": {
                "zh-cn": "我发现与人亲近比较容易。"
              }
            },
            {
              "type": "rating",
              "name": "AAS_AN01",
              "title": {
                "zh-cn": "我时常担心情侣/爱人并不真心爱我。"
              }
            },
            {
              "type": "rating",
              "name": "AAS_OC01",
              "title": {
                "zh-cn": "我发现要我去依赖别人很困难。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "AAS_AN02",
              "title": {
                "zh-cn": "我发现别人并不愿像我希望的那样亲近我。"
              }
            },
            {
              "type": "rating",
              "name": "AAS_OC02",
              "title": {
                "zh-cn": "能依赖别人让我感到很舒服。  "
              }
            },
            {
              "type": "rating",
              "name": "AAS_SC02",
              "title": {
                "zh-cn": "我不介意别人太亲近我。"
              }
            },
            {
              "type": "rating",
              "name": "AAS_OC03",
              "title": {
                "zh-cn": "我发现当我需要别人帮助时，没人会帮我。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "AAS_SC03",
              "title": {
                "zh-cn": "和别人亲近使我感到有些不舒服。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "AAS_AN03",
              "title": {
                "zh-cn": "我时常担心情侣/爱人不想和我呆在一起。"
              }
            },
          ]
        },
        {
          "type": "panel",
          "name": "AAS_container_panel_B",
          "visible": question_visible_1,
          "elements": [{
              "type": "rating",
              "name": "AAS_AN04",
              "title": {
                "zh-cn": "当我对别人表达我的情感时，我害怕他们与我的感觉会不一样。"
              }
            },
            {
              "type": "rating",
              "name": "AAS_AN05",
              "title": {
                "zh-cn": "我时常怀疑情侣/爱人是否真正关心我。"
              }
            },
            {
              "type": "rating",
              "name": "AAS_SC04",
              "title": {
                "zh-cn": "我对与别人建立亲密的关系感到很舒服。"
              }
            },
            {
              "type": "rating",
              "name": "AAS_SC05",
              "title": {
                "zh-cn": "当有人在情感上太亲近我时，我感到不舒服。 "
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "AAS_OC04",
              "title": {
                "zh-cn": "我知道当我需要别人帮助时，总有人会帮我。"
              }
            },
            {
              "type": "rating",
              "name": "AAS_AN06",
              "title": {
                "zh-cn": "我想与人亲近，但担心自己会受到伤害。"
              }
            },
            {
              "type": "rating",
              "name": "AAS_OC05",
              "title": {
                "zh-cn": "我发现我很难完全依赖别人。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "AAS_SC06",
              "title": {
                "zh-cn": "情侣/爱人想要我在情感上更亲近一些，这常使我感到不舒服。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "AAS_OC06",
              "title": {
                "zh-cn": "我不能肯定，在我需要时，能否找到可以依赖的人。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            }
          ],
        },
        {
          "type": "panel",
          "name": "SQ_container_panel_A",
          "visible": question_visible_1,
          "elements": [{
              "type": "rating",
              "name": "SQ01",
              "title": {
                "zh-cn": "我总是敢于主动说出自己的看法。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "SQ02",
              "title": {
                "zh-cn": "我身边的人都说我是一个害羞、退缩的人。"
              }
            },
            {
              "type": "rating",
              "name": "SQ03",
              "title": {
                "zh-cn": "我感到生活总是充满不确定性和不可预测性。"
              }
            },
            {
              "type": "rating",
              "name": "SQ04",
              "title": {
                "zh-cn": "我总是担心会发生什么不测。"
              }
            },
            {
              "type": "rating",
              "name": "SQ05",
              "title": {
                "zh-cn": "我从不敢拒绝朋友的请求。  "
              }
            },
            {
              "type": "rating",
              "name": "SQ06",
              "title": {
                "zh-cn": "遇到不开心的事，我总是独自生闷气或者痛哭。"
              }
            },
            {
              "type": "rating",
              "name": "SQ07",
              "title": {
                "zh-cn": "我一直觉得自己挺倒霉的。"
              }
            },
			{
              "type": "rating",
              "name": "SQ08",
              "title": {
                "zh-cn": "我从不轻易放弃自己的愿望和要求。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
          ]
        },
        {
          "type": "panel",
          "name": "PANAS_container_panel_B",
          "visible": question_visible_2,
          "elements": [{
              "type": "rating",
              "name": "SQ09",
              "title": {
                "zh-cn": "我总是担心太好的朋友关系以后会变坏。"
              }
            },
			{
              "type": "rating",
              "name": "SQ10",
              "title": {
                "zh-cn": "对领导我一般是敬而远之。"
              }
            },
            {
              "type": "rating",
              "name": "SQ11",
              "title": {
                "zh-cn": "我很少会担心自己的思维或情感会失去控制。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "SQ12",
              "title": {
                "zh-cn": "我总是“万事不求人”。"
              }
            },
            {
              "type": "rating",
              "name": "SQ13",
              "title": {
                "zh-cn": "我总是担心自己的生活会变得一团糟。 "
              }
            },
            {
              "type": "rating",
              "name": "SQ14",
              "title": {
                "zh-cn": "我感到自己无力应对和处理生活中突如其来的危险。"
              }
            },
            {
              "type": "rating",
              "name": "SQ15",
              "title": {
                "zh-cn": "我从不害怕与他人建立或保持亲近关系。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "SQ16",
              "title": {
                "zh-cn": "无论别人怎么说，我都觉得自己很没用。"
              }
            }
          ],
        },
      ]
    },
	{
	  "name": "WASSUP ",
	  "visible": true, //toggle
	  "elements": [{
	      "type": "html",
	      "name": "WASSUP_intro",
	      "html": "<p class='sv_instruction' style='margin-top: 0.5em;'>以下部分与你个人的人生价值有关。请阅读以下说法，并逐一评价你是否可能将它们设定为自己的<b>人生目标</b>。</p><p class='sv_description'>“1”分代表“绝对不可能，<br>“2”分代表“不太可能”，<br>“3”分代表“不能确定是否可能”，<br>“4”分代表“有可能”，<br>“5”分代表“肯定会”。</p>"
        },
	    {
	      "type": "panel",
	      "name": "WASSUP_container_panel",
	      "questionsOrder": "random",
	      "elements": [
	        {
	          "type": "rating",
	          "name": "WASSUP_RE01",
	          "title": {
	            "en-us": " Everyone I know will love me.",
	            "zh-cn": "拥有十位以上亲密无间的朋友。",
	          }
            },
	        {
	          "type": "rating",
	          "name": "WASSUP_RE02",
	          "title": {
	            "en-us": " I will have more than 10 close friends.",
	            "zh-cn": "获得身边所有人的喜爱。",
	          }
            },
	        {
	          "type": "rating",
	          "name": "WASSUP_F01",
	          "title": {
	            "en-us": "I will be famous",
	            "zh-cn": "成为世界著名的人物。",
	          }
            },
	        {
	          "type": "rating",
	          "name": "WASSUP_CR01",
	          "title": {
	            "en-us": "I will produce a great creative work.",
	            "zh-cn": "开拓一项伟大的事业。",
	          }
            },
	        {
	          "type": "rating",
	          "name": "WASSUP_CR02",
	          "title": {
	            "en-us": "I will make an important contribution in the field of art or science.",
	            "zh-cn": "在科学或文学、艺术领域作出重大的贡献。",
	          }
            },
	        {
	          "type": "rating",
	          "name": "WASSUP_RE03",
	          "title": {
	            "en-us": "Whenever I have a problem, my friends will drop what they are doing to support me.",
	            "zh-cn": "结交许多愿意舍弃自己的利益来帮助我的朋友。",
	          }
            },
	        {
	          "type": "rating",
	          "name": "WASSUP_CR03",
	          "title": {
	            "en-us": "My creative work will be acknowledged by experts in my field.",
	            "zh-cn": "从事开创性的工作并且获得业内专家的一致认可。",
	          }
            },
	        {
	          "type": "rating",
	          "name": "WASSUP_CR04",
	          "title": {
	            "en-us": "I will create work with enduring value that is original and useful.",
	            "zh-cn": "完成一项具有重要价值而又富有创意的发明。",
	          }
            },
	        {
	          "type": "rating",
	          "name": "WASSUP_F02",
	          "title": {
	            "en-us": "I will have a major role in a movie.",
	            "zh-cn": "主演一部电影。",
	          }
            },
	        {
	          "type": "rating",
	          "name": "WASSUP_RE04",
	          "title": {
	            "en-us": "I will have the closest family relationships.",
	            "zh-cn": "拥有令所有人都羡慕的美满家庭。",
	          }
            },
		  ]
		}
      ]
	},
    {
      "name": "RWA",
      "visible": true, //toggle
      "elements": [{
          "type": "html",
          "name": "RWA_intro",
          "html": {
            "zh-cn": "<p class='sv_instruction' style='margin-top: 0.5em;'>以下部分是关于你对社会问题的态度。请回想你平时的感受，并评价你是否同意以下说法。</p><p class='sv_description'>“1”分代表“非常不同意，<br>“2”分代表“不太同意”，<br>“3”分代表“不确定”，<br>“4”分代表“比较同意”，<br>“5”分代表“非常同意”。</p>"
          }
        },
        {
          "type": "panel",
          "name": "RWA_container_panel_A",
          "visible": question_visible_2,
          "elements": [

            {
              "type": "rating",
              "name": "RWA01",
              "title": {
                "en-us": "Some people are just inferior to others.",
                "zh-cn": "一些人天然地比另一些人更低等。"
              }
            },
            {
              "type": "rating",
              "name": "RWA02",
              "title": {
                "en-us": "It's OK if some groups have more of a chance in life than others.",
                "zh-cn": "一些群体比另一些在社会中拥有更多机会和资源是合理的。 "
              }
            },
            {
              "type": "rating",
              "name": "RWA03",
              "title": {
                "en-us": "To get ahead in life, it is sometimes necessary to step on others.",
                "zh-cn": "为了生活更好，有时必须踩着其他人往上爬。"
              }
            },
            {
              "type": "rating",
              "name": "RWA04",
              "title": {
                "en-us": "We would have fewer problems if we treated people more equally.",
                "zh-cn": "如果我们对待他人更公平些，我们的社会就能变得更好。",
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "RWA05",
              "title": {
                "en-us": "People ought to put less attention to the Bible and religion, instead they ought to develop their own moral standards.",
                "zh-cn": "人们不用太过恪守传统或宗教，而是应该发展出适合于当代的道德标准。"
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "RWA06",
              "title": {
                "en-us": "God's laws about abortion, pornography and marriage must be strictly followed before it is too late, violations must be punished.",
                "zh-cn": "我们应该严格遵守传统中关于婚姻和不道德行为的准则，违反者必须受到惩罚。",
              }
            },
            {
              "type": "rating",
              "name": "RWA07",
              "title": {
                "en-us": "Our society would be better off if we showed tolerance and understanding for untraditional values and opinions.",
                "zh-cn": "如果我们可以容忍并理解非传统的价值观和想法，我们的社会将变得更好。",
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "RWA08",
              "title": {
                "en-us": "If certain groups stayed in their place, we would have fewer problems.",
                "zh-cn": "如果非本地/本国的人呆在他们自己原本的区域生活，我们会少很多麻烦。",
              }
            },
            {
              "type": "rating",
              "name": "RWA09",
              "title": {
                "en-us": "If the society so wants, it is the duty of every true citizen to help eliminate the evil that poisons our country from within.",
                "zh-cn": "我们每个公民都有责任为国家消灭内部的反动势力。",

              }
            },
            {
              "type": "rating",
              "name": "RWA10",
              "title": {
                "en-us": "Many good people challenge the state, criticize the church and ignore 'the normal way of living'.",
                "zh-cn": "当今社会有很多人反对传统，忽视那些原本正常的生活方式，这是很不好的现象。",
              }
            },
            {
              "type": "rating",
              "name": "RWA11",
              "title": {
                "en-us": "We should do what we can to equalize conditions for different groups.",
                "zh-cn": "我们应该尽可能使收入和财富公平分配。",
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "RWA12",
              "title": {
                "en-us": "Our forefathers ought to be honoured more for the way they have built our society, at the same time we ought to put an end to those forces destroying it.",
                "zh-cn": "我们的祖先创造了这个社会，我们应该更加尊重他们，而且必须制止那些想要毁坏传统的势力。",
              }
            },
            {
              "type": "rating",
              "name": "RWA13",
              "title": {
                "en-us": "It is better to accept bad literature than to censor it.",
                "zh-cn": "即使是那些不好的媒体文章，我们也应该保证它们的出版自由，而不应该禁止它们。",
              } ,
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
          ]
        },
        {
          "type": "panel",
          "name": "RWA_container_panel_B",
          "visible": question_visible_1,
          "elements": [

            {
              "type": "rating",
              "name": "RWA14",
              "title": {
                "en-us": "Our country needs free thinkers, who will have the courage to stand up against traditional ways, even if this upsets many people.",
                "zh-cn": "我们的社会需要更多敢于挑战传统的自由思想家，即使他们的一些想法可能让很多人不满。",
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "RWA15",
              "title": {
                "en-us": "Our country needs a powerful leader, in order to destroy the radical and immoral currents prevailing in society today.",
                "zh-cn": "我们的国家需要强势的领导人，这样我们才能消灭那些盛行于社会中的邪恶势力。",
              }
            },
            {
              "type": "rating",
              "name": "RWA16",
              "title": {
                "en-us": "It would be best if newspapers were censored so that people would not be able to get hold of destructive and disgusting material.",
                "zh-cn": "媒体必须受到严格审查，这样人们才不会接触到那些有害的或令人讨厌的信息。",
              }
            },
            {
              "type": "rating",
              "name": "RWA17",
              "title": {
                "en-us": "Sometimes other groups must be kept in their place.",
                "zh-cn": "非本地/本国的人应该在他们自己原本的地方生活。",
              }
            },
            {
              "type": "rating",
              "name": "RWA18",
              "title": {
                "en-us": "It's probably a good thing that certain groups are at the top and other groups are at the bottom.",
                "zh-cn": "某些群体属于社会上层，另一些群体属于社会下层，这可能是一件好事。",
              }
            },
            {
              "type": "rating",
              "name": "RWA19",
              "title": {
                "en-us": "No one group should dominate society.",
                "zh-cn": "没有哪个群体应该支配整个社会。",
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "RWA20",
              "title": {
                "en-us": "The society needs to show openness towards people thinking differently, rather than a strong leader, the world is not particularly evil or dangerous.",
                "zh-cn": "社会需要包容那些具有不同想法的人，而不是需要一个强势的领导者来统一人们的想法。",
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "RWA21",
              "title": {
                "en-us": "There are many radical, immoral people trying to ruin things; the society ought to stop them.",
                "zh-cn": "许多邪恶的人试图制造麻烦，我们必须制止他们。",
              }
            },
            {
              "type": "rating",
              "name": "RWA22",
              "title": {
                "en-us": "We would have fewer problems if we treated people more equally.",
                "zh-cn": "如果我们对待他人再公平些，社会就会减少许多问题。",
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "RWA23",
              "title": {
                "en-us": "The situation in the society of today would not be improved if troublemakers were treated with reason and humanity.",
                "zh-cn": "如果我们对待违反社会规则的人更仁慈、更理性，社会的现况就难以得到改善。",
              }
            },
            {
              "type": "rating",
              "name": "RWA24",
              "title": {
                "en-us": "Facts show that we have to be harder against crime and sexual immorality, in order to uphold law and order.",
                "zh-cn": "为了维护法律和社会秩序，我们必须更严厉地惩罚违法犯罪和不道德的行为。"
              }
            },
            {
              "type": "rating",
              "name": "RWA25",
              "title": {
                "en-us": "We should do what we can to equalize conditions for different groups.",
                "zh-cn": "我们应该尽可能减少不同群体之间生活条件的不平等。",
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "RWA20",
              "title": {
                "en-us": "All groups should be given an equal chance in life.",
                "zh-cn": "所有人在社会中都应该享有平等的机会。",
              },
			  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
            },
            {
              "type": "rating",
              "name": "RWA26",
              "title": {
                "en-us": "In getting what you want, it is sometimes necessary to use force against other groups.",
                "zh-cn": "有时候，为了实现自己的目的，必须对其他一些人使用强制的手段。",
              }
            },
          ]
        },
      ]
    },
    {
      "name": "DAS",
      "visible": true, //toggle
      "elements": [{
          "type": "html",
          "name": "DAS_intro",
          "html": "<p class='sv_instruction' style='margin-top: 0.5em;'>以下部分是关于你对待生命的态度。请回想你平时的感受，并评价你是否同意以下说法。</p><p class='sv_description'>“1”分代表“非常不同意，<br>“2”分代表“不太同意”，<br>“3”分代表“不确定”，<br>“4”分代表“比较同意”，<br>“5”分代表“非常同意”。</p>"
        },
        {
          "type": "rating",
          "name": "DAS01",
          "title": {
            "zh-cn": "我经常会想生命如此短暂。"
          }
        },
        {
          "type": "rating",
          "name": "DAS02",
          "title": {
            "zh-cn": "我很少想到死亡。"
          },
		  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
        },
        {
          "type": "rating",
          "name": "DAS03",
          "title": {
            "zh-cn": "人们谈论死亡时我不会感到紧张。"
          },
		  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
        },
        {
          "type": "rating",
          "name": "DAS04",
          "title": {
            "zh-cn": "当我想到自己要接受手术时会害怕。"
          }
        },
        {
          "type": "rating",
          "name": "DAS05",
          "title": {
            "zh-cn": "我一点也不害怕死亡。 "
          },
		  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
        },
        {
          "type": "rating",
          "name": "DAS06",
          "title": {
            "zh-cn": "我不是很害怕患上癌症。"
          },
		  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
        },
        {
          "type": "rating",
          "name": "DAS07",
          "title": {
            "zh-cn": "我从来不会因为想到死亡而烦恼。"
          },
		  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
        },
        {
          "type": "rating",
          "name": "DAS08",
          "title": {
            "zh-cn": "我经常因为时间过得飞快而感到痛苦。"
          }
        },
        {
          "type": "rating",
          "name": "DAS09",
          "title": {
            "zh-cn": "我害怕痛苦地死去。"
          }
        },
        {
          "type": "rating",
          "name": "DAS10",
          "title": {
            "zh-cn": "关于死后世界的话题令我非常不安。"
          },
		  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
        },
        {
          "type": "rating",
          "name": "DAS11",
          "title": {
            "zh-cn": "我常害怕心脏病发作。"
          }
        },
        {
          "type": "rating",
          "name": "DAS12",
          "title": {
            "zh-cn": "我非常害怕死亡。"
          }
        },
        {
          "type": "rating",
          "name": "DAS13",
          "title": {
            "zh-cn": "当听到别人谈论世界末日时我会吓得发抖。 "
          }
        },
        {
          "type": "rating",
          "name": "DAS14",
          "title": {
            "zh-cn": "当我看到遗体时会毛骨悚然。"
          }
        },
        {
          "type": "rating",
          "name": "DAS15",
          "title": {
            "zh-cn": "对于未来我没有什么可恐惧的。"
          },
		  "rateValues": [ { "value": 5, "text": "1" }, { "value": 4, "text": "2" }, 3, { "value": 2, "text": "4" }, { "value": 1,"text": "5" } ],
        }
      ]
    }
  ],
  // "cookieName": "survey_cookies",
  "sendResultOnPageNext": true,
  "showPageTitles": false,
  "showCompletedPage": true,
  // "navigateToUrl": experiment_page,
  "showQuestionNumbers": "off",
  "showProgressBar": "top",
  "goNextPageAutomatic": true,
  "clearInvisibleValues": "none",
  "pagePrevText": {
    "en-us": "Prev",
    "zh-cn": "上一页"
  },
  "pageNextText": {
    "en-us": "Next",
    "zh-cn": "下一页"
  },
  "completeText": {
    "en-us": "Submit",
    "zh-cn": "完成"
  },
  "previewText": {
    "en-us": "Preview",
    "zh-cn": "预览"
  },
  "minTimeToFinishPage": 120,
  // "showTimerPanel": "bottom", 
  "showTimerPanelMode": "page"
}
window.survey = new Survey.Model(json);


// some effect when loading
$(document)
  .ready(function() {
    $("body")
      .fadeIn("slow");
    $("#preSurvey")
      .fadeOut();
  });

survey
  .onComplete
  .add(function(result) {
    // document
    // .querySelector('#surveyResult')
    // .textContent = "结果：\n" + JSON.stringify(result.data, null, 3);
    saveDatatoServer(result.data);
  });


  function saveDatatoServer(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/save?type=survey', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    console.log('req status ' + xhr.status);
    if (xhr.status == '200') {
      setTimeout(function() {
        window.location.href = experiment_page
      }, 1000);
    }
    else if (xhr.status) {
      function alertFunction() {
        alert("很抱歉！由于网络通信故障，你的数据未能成功保存。请立即与研究者联系，报告这项错误，谢谢！");
      }
    }
  }


/* used to send data to google sheet but unusable here */
// function sendDataToGoogleSheet(survey, options) {
// options.showDataSaving();
// $.ajax({
// url: ' ', 
// type: 'post',
// data: JSON.stringify(survey.data),
// headers: {
// "Content-Type": "text/plain"
// },
// processData: false,
// complete: function(res, status) {
// if (status == 'success') {
// options.showDataSavingSuccess();
// } else {
// options.showDataSavingError();
// }
// },
// });
// }


$("#surveyElement")
  .Survey({
    model: survey,
    css: myCss,
    onValidateQuestion: surveyValidateQuestion,
    //onComplete: sendDataToGoogleSheet

  });
