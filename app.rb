require 'sinatra'

get '/' do
  @none_cookie = request.cookies['none_cookie']
  @lax_cookie = request.cookies['lax_cookie']
  @strict_cookie = request.cookies['strict_cookie']
  erb :index
end

get '/set-cookies' do
  response.set_cookie(:none_cookie, value: Time.now, expires: Time.now + 3600 * 24, httponly: true, same_site: 'None', secure: true)
  response.set_cookie(:lax_cookie, value: Time.now, expires: Time.now + 3600 * 24, httponly: true, same_site: 'Lax', secure: true)
  response.set_cookie(:strict_cookie, value: Time.now, expires: Time.now + 3600 * 24, httponly: true, same_site: 'Strict', secure: true)
  redirect to('/')
end