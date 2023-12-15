# sql 笔记


# 选择数据库的某一张表
SELECT * FROM test.student;


# 选择学生表中 id = 1 并且 name 是张三的 学生
SELECT * FROM test.student WHERE id = 1 AND name="张三";