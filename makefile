build:
	@docker build -t img_mongo dbContainer/.
run:
		@docker run -p 29000:27017 --name=mongo-server -d img_mongo --storageEngine wiredTiger --config /data/dbconfig/mongodb.conf
setlog:
		@mkdir appLogs
		@touch appLogs/appLog.log
setup:
	@docker exec mongo-server /bin/bash /var/workdir/startup.sh
	@docker stop mongo-server
	@docker start mongo-server
start:
	@docker start mongo-server
restart:
	@docker stop mongo-server
	@docker start mongo-server
stop:
	@docker stop mongo-server
clean:	stop
	@docker rm -v -f mongo-server
shell:
	@docker exec -it mongo-server /bin/bash
mongoshell:
	@mongo --host 127.0.0.1:29000 appdb -u appAdmin -p
