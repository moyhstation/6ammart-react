git pull
yarn run build
pm2 delete "6ammart-web-next-js"
pm2 start npm --name "6ammart-web-next-js" -- start
