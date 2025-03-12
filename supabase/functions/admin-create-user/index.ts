
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Get the JWT token from the authorization header
    const token = authHeader.replace('Bearer ', '')
    
    // Verify the JWT token and get the user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Check if the requester is an admin
    const { data: requesterProfile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    if (profileError || !requesterProfile || requesterProfile.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Forbidden: only admins can create users' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Parse the request body
    const { email, password, firstName, lastName, role } = await req.json()
    
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    if (role !== 'user' && role !== 'inventory_manager' && role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Invalid role' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Create the user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { 
        first_name: firstName,
        last_name: lastName 
      }
    })
    
    if (createError) {
      return new Response(
        JSON.stringify({ error: createError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Update the user's profile with the role
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ 
        first_name: firstName, 
        last_name: lastName,
        role
      })
      .eq('id', newUser.user.id)
    
    if (updateError) {
      console.error('Error updating profile:', updateError)
      // Don't return an error here, the user was created successfully
    }
    
    return new Response(
      JSON.stringify({ success: true, user: { id: newUser.user.id, email } }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Error creating user:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
