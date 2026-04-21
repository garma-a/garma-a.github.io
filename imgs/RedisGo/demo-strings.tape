# VHS tape file: RedisGo String Commands Demo
Output imgs/RedisGo/demo-strings.gif

Set Shell bash
Set FontSize 16
Set Width 900
Set Height 500
Set Theme "Dracula"
Set Padding 20

# Start the RedisGo server in the background
Type "# Start RedisGo server on port 6379"
Enter
Sleep 500ms
Type "./imgs/RedisGo/redis-server &"
Enter
Sleep 1500ms

# Clear and begin demo
Type "clear"
Enter
Sleep 500ms

# PING
Type "# 1. PING — Check connectivity"
Enter
Sleep 400ms
Type "redis-cli PING"
Enter
Sleep 1200ms

# SET/GET
Type ""
Enter
Type "# 2. SET/GET — Store and retrieve a key"
Enter
Sleep 400ms
Type "redis-cli SET user Garma"
Enter
Sleep 1000ms
Type "redis-cli GET user"
Enter
Sleep 1200ms

# SET with EX (TTL)
Type ""
Enter
Type "# 3. SET with EX — Key expires after 3 seconds"
Enter
Sleep 400ms
Type "redis-cli SET session abc123 EX 3"
Enter
Sleep 1000ms
Type "redis-cli GET session"
Enter
Sleep 1200ms
Type "# Waiting 4 seconds for TTL to expire..."
Enter
Sleep 4000ms
Type "redis-cli GET session"
Enter
Sleep 1500ms

# TYPE
Type ""
Enter
Type "# 4. TYPE — Check data type of key"
Enter
Sleep 400ms
Type "redis-cli TYPE user"
Enter
Sleep 1200ms

# Clean up
Type ""
Enter
Sleep 500ms
Type "kill %1 2>/dev/null"
Enter
Sleep 500ms
