# VHS tape file: RedisGo Stream Engine Demo
Output imgs/RedisGo/demo-streams.gif

Set Shell bash
Set FontSize 16
Set Width 900
Set Height 550
Set Theme "Dracula"
Set Padding 20

# Start server
Type "./imgs/RedisGo/redis-server &"
Enter
Sleep 1500ms
Type "clear"
Enter
Sleep 500ms

# XADD with explicit ID
Type "# 1. XADD — Add entries to a stream"
Enter
Sleep 400ms
Type "redis-cli XADD events 1-1 action login user Garma"
Enter
Sleep 1200ms

# XADD with auto ID
Type "redis-cli XADD events '*' action deploy service api"
Enter
Sleep 1200ms
Type "redis-cli XADD events '*' action alert level critical"
Enter
Sleep 1200ms

# XRANGE
Type ""
Enter
Type "# 2. XRANGE — Query stream entries by range"
Enter
Sleep 400ms
Type "redis-cli XRANGE events - +"
Enter
Sleep 2000ms

# TYPE
Type ""
Enter
Type "# 3. TYPE — Verify stream data type"
Enter
Sleep 400ms
Type "redis-cli TYPE events"
Enter
Sleep 1200ms

# Clean up
Type ""
Enter
Sleep 500ms
Type "kill %1 2>/dev/null"
Enter
Sleep 500ms
