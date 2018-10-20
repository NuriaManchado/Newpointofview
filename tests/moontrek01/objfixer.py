import sys

#print sys.argv[1]

fn_input = 'input_model.obj'
fn_output = 'output_model.obj'

fn_input = sys.argv[1]
fn_output = sys.argv[1]

f = open(fn_input, 'r')
fulltext = f.read()
f.close()

lines = fulltext.splitlines()

last_f_line_with_slash = '/'

for idx in xrange(len(lines)):
    line = lines[idx]
    #print line
    if len(line) == 0: continue
    if line[0] != 'f': continue
    #print line
    if -1 != line.find('/'):
        last_f_line_with_slash = idx
        pass#print 'line has SLASH'
    else:
        print line
        print 'line has no slash'
        print 'last f line with slash: ' + str(last_f_line_with_slash)
        break

outtext = ''

for idx in xrange(last_f_line_with_slash):
    outtext += lines[idx] + '\n'

f = open(fn_output, 'w')
f.write(outtext)
f.close()

