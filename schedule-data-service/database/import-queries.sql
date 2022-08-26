SELECT *  FROM schema ORDER BY `EC HBG FEU19e` DESC;

SELECT * FROM schema WHERE class IS NULL;

DELETE FROM schema WHERE class IS NULL;

SELECT * FROM schema;

UPDATE schema SET class = 17, larare = schema."EC Malmö MVT19" WHERE `EC Malmö MVT19` != '';

UPDATE schema SET klass = `EC HBG WIN19e` WHERE `EC HBG WIN19e` != '';

UPDATE schema SET class = 57, larare = schema.`Övrigt Upptagen` WHERE `Övrigt Upptagen` != "";
UPDATE schema SET class = 57, larare = `Övrigt Upptagen` WHERE `Övrigt Upptagen` != "";
UPDATE schema SET `class` = 14, larare = `EC HBG FEU19e` WHERE `EC HBG FEU19e` != "";

SELECT * FROM schools;

SELECT * FROM classes ORDER BY school, shortName;

INSERT INTO classes (name, shortName, school, blog) 
    VALUES ('WIN19','WIN19e',7,''),
    ('Javautvecklare 19','Java19e',8,'https://java19.lms.nodehill.se/'),
    ('Javautvecklare 20','Java20e',8,'https://java20e.lms.nodehill.se/'),
    ('Mjukvarutestare 19','MVT19',8,'https://mvt19.lms.nodehill.se/'),
    ('Frontendutvecklare 20','FEU20e',8,''),
    ('Objektorienterad Programmerare med AI-kompetens 20','OPA20',4,'https://opa20.lms.nodehill.se/'),
    ('Objektorienterad Programmerare med AI-kompetens 20 Extra','OPA20X',4,'https://opa20x.lms.nodehill.se/'),
    ('Objektorienterad Programmerare med AI-kompetens 21','OPA21',4,'https://opa21.lms.nodehill.se/'),
    ('Python med AI 21','PAI21',4,'https://pai21.lms.nodehill.se/'),
    ('DAS20','DAS20',10,''),
    ('GDAS19','GDAS19',10,''),
    ('DEV21M','DEV21M',5,'https://devop.lms.nodehill.com/'),
    ('FRK20G','FRK20G',5,''),
    ('FRK20S','FRK20S',5,''),
    ('FWK20G','FWK20G',5,''),
    ('FWK20S','FWK20S',5,''),
    ('TTK20G','TTK20G',5,''),
    ('TTK21G','TTK21G',5,''),
    ('DAN20','DAN20',9,'https://dan20.lms.nodehill.se/'),
    ('DCD20M','DCD20M',9,''),
    ('FED20m','FED20m',9,'https://fed20m.lms.nodehill.se/'),
    ('FED21m','FED21m',9,'https://fed21m.lms.nodehill.se/'),
    ('OLM20','OLM20',9,'https://olm20.lms.nodehill.se/'),
    ('OLM20D','OLM20D',9,''),
    ('OLM21m','OLM21m',9,''),
    ('WAN20','WAN20',9,'https://wan20.lms.nodehill.se/'),
    ('WAN21m','WAN21m',9,'https://wan21.lms.nodehill.se/'),
    ('WCM20','WCM20',9,'https://wcm20.lms.nodehill.se/'),
    ('WCM21','WCM21',9,'https://wcm21.lms.nodehill.se/'),
    ('NET19n','NET19n',3,'https://sysm3.newton.nodehill.se/'),
    ('NET20n','NET20n',3,'https://sysm4.newton.nodehill.se/'),
    ('NET21n','NET21n',3,'https://sysm5.newton.nodehill.se/'),
    ('Java19n','Java19n',3,'https://sysjm3.newton.nodehill.se/'),
    ('Java20n','Java20n',3,'https://sysjm4.newton.nodehill.se/'),
    ('Java21n','Java21n',3,'https://sysjm5.newton.nodehill.se/'),
    ('Kram5','Kram5',3,'https://kram5.newton.nodehill.se/'),
    ('Java19p','Java19p',2,'https://java19p.lms.nodehill.se/'),
    ('Java20gbg','Java20gbg',1,'https://java20gbg.lms.nodehill.se/'),
    ('Java20p','Java20p',2,'https://java20p.lms.nodehill.se/'),
    ('Java21gbg','Java21gbg',1,'https://java21gbg.lms.nodehill.se/'),
    ('Java21h','Java21h',2,'https://java21h.lms.nodehill.se/'),
    ('Java21v','Java21v',2,'https://java21v.lms.nodehill.se/'),
    ('Övrigt','Övrigt',11,'https://www.nodehill.com/');

    
UPDATE schema SET `class` = 14, larare = `EC HBG FEU19e` WHERE `EC HBG FEU19e` != "";
UPDATE schema SET `class` = 15, larare = `EC HBG WIN19e` WHERE `EC HBG WIN19e` != "";
UPDATE schema SET `class` = 16, larare = `EC Malmö Java19e` WHERE `EC Malmö Java19e` != "";
UPDATE schema SET `class` = 17, larare = `EC Malmö Java20e` WHERE `EC Malmö Java20e` != "";
UPDATE schema SET `class` = 18, larare = `EC Malmö MVT19` WHERE `EC Malmö MVT19` != "";
UPDATE schema SET `class` = 19, larare = `EC FEU20e` WHERE `EC FEU20e` != "";
UPDATE schema SET `class` = 12, larare = `HAK OPA20` WHERE `HAK OPA20` != "";
UPDATE schema SET `class` = 21, larare = `HAK OPA20X` WHERE `HAK OPA20X` != "";
UPDATE schema SET `class` = 13, larare = `HAK OPA21` WHERE `HAK OPA21` != "";
UPDATE schema SET `class` = 23, larare = `HAK PYAI1` WHERE `HAK PYAI1` != "";
UPDATE schema SET `class` = 24, larare = `IHM DAS20` WHERE `IHM DAS20` != "";
UPDATE schema SET `class` = 25, larare = `IHM GDAS19` WHERE `IHM GDAS19` != "";
UPDATE schema SET `class` = 26, larare = `DEV21M` WHERE `DEV21M` != "";
UPDATE schema SET `class` = 27, larare = `FRK20G` WHERE `FRK20G` != "";
UPDATE schema SET `class` = 28, larare = `FRK20S` WHERE `FRK20S` != "";
UPDATE schema SET `class` = 29, larare = `FWK20G` WHERE `FWK20G` != "";
UPDATE schema SET `class` = 30, larare = `FWK20S` WHERE `FWK20S` != "";
UPDATE schema SET `class` = 31, larare = `TTK20G` WHERE `TTK20G` != "";
UPDATE schema SET `class` = 32, larare = `TTK21G` WHERE `TTK21G` != "";
UPDATE schema SET `class` = 33, larare = `MI DAN20` WHERE `MI DAN20` != "";
UPDATE schema SET `class` = 34, larare = `MI DCD20M` WHERE `MI DCD20M` != "";
UPDATE schema SET `class` = 35, larare = `MI FED20m` WHERE `MI FED20m` != "";
UPDATE schema SET `class` = 36, larare = `MI FED21m` WHERE `MI FED21m` != "";
UPDATE schema SET `class` = 37, larare = `MI OLM20` WHERE `MI OLM20` != "";
UPDATE schema SET `class` = 38, larare = `MI OLM20D` WHERE `MI OLM20D` != "";
UPDATE schema SET `class` = 39, larare = `MI OLM21m` WHERE `MI OLM21m` != "";
UPDATE schema SET `class` = 40, larare = `MI WAN20` WHERE `MI WAN20` != "";
UPDATE schema SET `class` = 41, larare = `MI WAN21m` WHERE `MI WAN21m` != "";
UPDATE schema SET `class` = 42, larare = `MI WCM20` WHERE `MI WCM20` != "";
UPDATE schema SET `class` = 43, larare = `MI WCM21` WHERE `MI WCM21` != "";
UPDATE schema SET `class` = 44, larare = `Newton .NET19n` WHERE `Newton .NET19n` != "";
UPDATE schema SET `class` = 45, larare = `Newton .NET20n` WHERE `Newton .NET20n` != "";
UPDATE schema SET `class` = 46, larare = `Newton .NET21n` WHERE `Newton .NET21n` != "";
UPDATE schema SET `class` = 47, larare = `Newton Java19n` WHERE `Newton Java19n` != "";
UPDATE schema SET `class` = 48, larare = `Newton Java20n` WHERE `Newton Java20n` != "";
UPDATE schema SET `class` = 49, larare = `Newton Java21n` WHERE `Newton Java21n` != "";
UPDATE schema SET `class` = 50, larare = `Newton Krav21n` WHERE `Newton Krav21n` != "";
UPDATE schema SET `class` = 51, larare = `PlusHS Java19p` WHERE `PlusHS Java19p` != "";
UPDATE schema SET `class` = 52, larare = `PlusHS Java20gbg` WHERE `PlusHS Java20gbg` != "";
UPDATE schema SET `class` = 53, larare = `PlusHS Java20p` WHERE `PlusHS Java20p` != "";
UPDATE schema SET `class` = 54, larare = `PlusHS Java21gbg` WHERE `PlusHS Java21gbg` != "";
UPDATE schema SET `class` = 55, larare = `PlusHS Java21h` WHERE `PlusHS Java21h` != "";
UPDATE schema SET `class` = 56, larare = `PlusHS Java21v` WHERE `PlusHS Java21v` != "";
UPDATE schema SET `class` = 57, larare = `Övrigt Upptagen` WHERE `Övrigt Upptagen` != "";



CREATE TABLE to_schedule AS SELECT Datum AS date, class, larare, note AS notes FROM schema;

SELECT * FROM to_schedule WHERE length(larare) = 2;

SELECT * FROM to_schedule WHERE length(larare) > 2;

SELECT trim(substr(larare, 0, 3)) AS teach, trim(substr(larare, 3)) AS note FROM to_schedule;
UPDATE to_schedule SET larare = trim(substr(larare, 0, 3)), notes = trim(substr(larare, 3));

SELECT * from to_schedule WHERE notes != "";

DELETE FROM to_schedule WHERE larare = "HE" AND notes = "LGDAG";

UPDATE to_schedule SET notes = trim(notes,']') WHERE notes != "";

UPDATE to_schedule SET notes = trim(notes) WHERE notes != "";

UPDATE to_schedule SET notes = trim(notes,'[') WHERE notes != "";

UPDATE to_schedule SET startTime = '09:00', endTime = '16:00' WHERE class in(44,45,46,47,48,49,50,6,7,8,9,10,11);
UPDATE to_schedule SET startTime = '09:00', endTime = '16:00' WHERE class in(24,25,33,34,35,36,37,38,39,40,41,42,43);
UPDATE to_schedule SET startTime = '08:15', endTime = '16:00' WHERE class in(1,4,5,53,55,56,51);
UPDATE to_schedule SET startTime = '08:30', endTime = '16:30' WHERE class in(52,54,2,3);
UPDATE to_schedule SET startTime = '08:30', endTime = '16:30' WHERE class in(14,15,16,17,18,19);

SELECT DISTINCT larare FROM to_schedule;

UPDATE to_schedule SET teacher = 4 WHERE larare = 'TF';
UPDATE to_schedule SET teacher = 1 WHERE larare = 'BB';
UPDATE to_schedule SET teacher = 9 WHERE larare = 'CM';
UPDATE to_schedule SET teacher = 7 WHERE larare = 'ML';
UPDATE to_schedule SET teacher = 11 WHERE larare = 'MN';
UPDATE to_schedule SET teacher = 2 WHERE larare = 'JW';
UPDATE to_schedule SET teacher = 10 WHERE larare = 'AS';
UPDATE to_schedule SET teacher = 14 WHERE larare = 'AB';
UPDATE to_schedule SET teacher = 17 WHERE larare = 'MS';
UPDATE to_schedule SET teacher = 13 WHERE larare = 'NH';
UPDATE to_schedule SET teacher = 6 WHERE larare = 'JB';
UPDATE to_schedule SET teacher = 15 WHERE larare = 'SM';
UPDATE to_schedule SET teacher = 5 WHERE larare = 'MR';
UPDATE to_schedule SET teacher = 18 WHERE larare = 'DM';
UPDATE to_schedule SET teacher = 3 WHERE larare = 'MH';
UPDATE to_schedule SET teacher = 16 WHERE larare = 'MI';
UPDATE to_schedule SET teacher = 19 WHERE larare = 'HJ';
UPDATE to_schedule SET teacher = 8 WHERE larare = 'XX';
UPDATE to_schedule SET teacher = 1 WHERE larare = 'bb';

SELECT * FROM to_schedule WHERE larare = 'bb';
