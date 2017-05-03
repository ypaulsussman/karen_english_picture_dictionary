CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null,
  "password" varchar(120) not null,
  "role" varchar(40) DEFAULT 'student',
  "study_list" text[],
  CONSTRAINT only_one_per_list UNIQUE ("username")
);

CREATE TABLE "items" (
  "id" serial primary key,
  "item_theme" varchar(80) not null,
  "item_prompt" text,
  "item_answer_en" varchar(200) not null,
  "item_answer_kn"  varchar(200) not null,
  "item_answer_phon_kn" varchar(200) not null
);

CREATE TABLE "study_list"(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "users",
  item_id INT REFERENCES "items",
  CONSTRAINT only_one_per_list UNIQUE ("user_id", "item_id")
);

INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','1194983761256499536house_gabrielle_nowicki_.svg.med.png','house','[H. < A ''X; ','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','1194983836541063118bb_trsh_.svg.med.png','trash','vXtbsK; wtd.','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','1194984436700707086wooden_table_benji_park_01.svg.med.png','table','pD> eDR cd.','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','11949847451930224385televisore_telecomando_a_01.svg.med.png','TV','uJGR [lzsg','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','11949851871185277522Condominio.svg.med.png','apartment','asdfa','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','11954234122127558342Machovka_Microwave_oven_1.svg.med.png','microwave','dfgnf','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','11954291422072351955johnny_automatic_wooden_chair.svg.med.png','chair','ytuov','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','11954296111581224882Machovka_Bookcase.svg.med.png','bookshelf','hjug','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','1195445403831271262liftarn_Lightbulb_2.svg.med.png','light','cbnvbn','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','11971054672097824636biswajyotim_Fan.svg.med.png','fan','[H. < A ''X; ','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','1206569601921929095mako_Toilet_(Seat_Closed).svg.med.png','toilet','vXtbsK; wtd.','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','1223615532442623843djmx1_cadenas_1.svg.med.png','lock','pD> eDR cd.','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','12307222151350242235fridge_with_food_jhelebrant.svg.med.png','refrigerator','uJGR [lzsg','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','1237562172708840408pitr_Window_icon.svg.med.png','window','asdfa','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','13920445601430208058stain.svg.med.png','stain','dfgnf','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','1396322173325001652sink.svg.med.png','sink','ytuov','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','faucet-md.png','faucet','hjug','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','number-doored-md.png','door','cbnvbn','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','radiator-md.png','radiator','[H. < A ''X; ','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','recepticle-md.png','outlet','vXtbsK; wtd.','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','sofa-md.png','sofa','pD> eDR cd.','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','stove-md.png','stove','uJGR [lzsg','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','tub-and-shower-md.png','shower','asdfa','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('At Home','yellow-key-md.png','key','dfgnf','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','1194989210401174033sun01.svg.med.png','sun','ytuov','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','1195431270873857563storms_ryanlerch_01.svg.med.png','storm','hjug','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','1197089396151240572hawk88_Calendar.svg.med.png','calendar','cbnvbn','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','1228428511169123817sivvus_weather_symbols_3.svg.med.png','clouds','[H. < A ''X; ','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','1228428520667582858sivvus_weather_symbols_4.svg.med.png','rain','vXtbsK; wtd.','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','april-teal-md.png','April','pD> eDR cd.','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','august-md.png','August','uJGR [lzsg','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','december-teal-md.png','December','asdfa','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','february-teal-md.png','February','dfgnf','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','january-teal-md.png','January','ytuov','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','july-teal-md.png','July','hjug','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','june-teal-md.png','June','cbnvbn','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','march-teal-md.png','March','[H. < A ''X; ','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','may-teal-md.png','May','vXtbsK; wtd.','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','november-teal-md.png','November','pD> eDR cd.','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','october-teal-md.png','October','uJGR [lzsg','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','september-teal-md.png','September','asdfa','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','snow-clouds-md.png','snow','dfgnf','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','tree-fall.png','fall','ytuov','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','tree-spring.png','spring','hjug','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','tree-summer.png','summer','cbnvbn','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Months and Weather','tree-winter.png','winter','[H. < A ''X; ','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','124223168010536658470_white,_blue_rounded_rectangle.svg.med.png','zero','vXtbsK; wtd.','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','1242231820100003387110_white,_blue_rounded_rectangle.svg.med.png','ten','pD> eDR cd.','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','1242232129118292369512_white,_blue_rounded_rectangle.svg.med.png','twelve','uJGR [lzsg','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','1242232313140273699413_white,_blue_rounded_rectangle.svg.med.png','thirteen','asdfa','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','1242233076168352916415_white,_blue_rounded_rectangle.svg.med.png','fifteen','dfgnf','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','1242233338139882267316_white,_blue_rounded_rectangle.svg.med.png','sixteen','ytuov','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','1242233458197991077117_white,_blue_rounded_rectangle.svg.med.png','seventeen','hjug','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','1242233550209206271918_white,_blue_rounded_rectangle.svg.med.png','eighteen','cbnvbn','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','1242233644194249700319_white,_blue_rounded_rectangle.svg.med.png','nineteen','[H. < A ''X; ','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','124223382120561297721_white,_blue_rounded_rectangle.svg.med.png','one','vXtbsK; wtd.','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','1242233943119037651720_white,_blue_rounded_rectangle.svg.med.png','twenty','pD> eDR cd.','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','124223524211732842342_white,_blue_rounded_rectangle.svg.med.png','two','uJGR [lzsg','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','12422360324178341083_white,_blue_rounded_rectangle.svg.med.png','three','asdfa','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','12422361536571262314_white,_blue_rounded_rectangle.svg.med.png','four','dfgnf','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','124223627610241517395_white,_blue_rounded_rectangle.svg.med.png','five','ytuov','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','124223642515646791536_white,_blue_rounded_rectangle.svg.med.png','six','hjug','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','124223663419025188457_white,_blue_rounded_rectangle.svg.med.png','seven','cbnvbn','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','124223675512235603908_white,_blue_rounded_rectangle.svg.med.png','eight','[H. < A ''X; ','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Numbers','124223684715638240389_white,_blue_rounded_rectangle.svg.med.png','nine','vXtbsK; wtd.','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','11949837962021156671notebook1_sergio_luiz_ar_02.svg.med.png','computer','pD> eDR cd.','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','11949839802000278259crayon.svg.med.png','pencil','uJGR [lzsg','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','11949844751149859432eraser.svg.med.png','eraser','asdfa','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','1194985947103703880closed_book_01.svg.med.png','book ','dfgnf','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','11954228771471841766johnny_automatic_cell_phone.svg.med.png','cell phone','ytuov','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','1195425108753906792red_pen_nick_michaluk_01.svg.med.png','pen','hjug','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','1195425637543422365Machovka_Writing.svg.med.png','write','cbnvbn','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','11954330371666699999paro_AL_LISTEN_.svg.med.png','listen','[H. < A ''X; ','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','11970984271150339963SteveLambert_Michelle_Kempner_Reading.svg.med.png','read','vXtbsK; wtd.','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','loose-leaf-paper-md.png','paper','pD> eDR cd.','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','speaking-man-md.png','speak','uJGR [lzsg','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','spiral-notebook-md.png','notebook','asdfa','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','student-asking-a-question-md.png','ask','dfgnf','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('The Classroom','student-desk-md.png','desk','[H. < A ''X; ','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','1194984901396052510direction_a_suivre_3_yve_01.svg.med.png','right','vXtbsK; wtd.','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','119498490148790545direction_a_suivre_2_yve_01.svg.med.png','left','pD> eDR cd.','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','11949849021176229925direction_a_suivre_4_yve_01.svg.med.png','straight','uJGR [lzsg','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','1194984910785474358stop_sign_miguel_s_nchez_.svg.med.png','stop','asdfa','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','11949849761176136192traffic_light_green_dan__01.svg.med.png','go','dfgnf','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','11949849771043985234traffic_light_red_dan_ge_01.svg.med.png','stop','ytuov','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','11949849782053089133traffic_light_yellow_dan_01.svg.med.png','slow down','hjug','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','1194985155394491109car_jamin_ellis_.svg.med.png','car','cbnvbn','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','11949851611473942866bus1_bw_jarno_vasamaa_01.svg.med.png','bus','[H. < A ''X; ','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','1194989524272069055do_not_enter_sign_01.svg.med.png','don''t go in','vXtbsK; wtd.','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','1194989549208635715one_way_sign_01.svg.med.png','only go one way','pD> eDR cd.','bnm,');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','11949895931025044925bicycle_01.svg.med.png','bike','uJGR [lzsg','.,''p[\');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','1194989612991991445aircraft_jarno_vasamaa_.svg.med.png','airplane','asdfa','zxcv');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','gas-pump-md.png','gas','dfgnf','yuio');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','train-md.png','train','ytuov','ki780');
INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ('Travelling','truck-18-wheeler-trucker-md.png','truck','hjug','bnm,')
