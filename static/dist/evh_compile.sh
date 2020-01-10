#!/usr/bin/env sh

: <<'END_COMMENT'

    This is the closure compiler for Evalhalla. We're bundling things up here
    so that we can get it all to work in IE11 with minimal efforts.

    This will probably be sunset in favor of a react based transpilation
    step once we migrate the player and the designer to React.

    Might need to do
    #Before Use: chmod +x compile
    #Use: ./compile.sh ./build/js/index.js \

    Using https://developers.google.com/closure/compiler/docs/gettingstarted_app

END_COMMENT

##############################################################################
# Our compiler jar go get it here: 
# https://developers.google.com/closure/compiler/docs/gettingstarted_app
CMP_JAR=$(cat <<-END
~/Development/closure-compiler/closure-compiler.jar \

END
)

##############################################################################
# Let the user know we're starting up
echo -e "== EVALHALLA COMPILE =="
echo -e "-- $CMP_JAR"

# Our output js
# unique outputs for:
# - Designer
# - Player
# - Dashboard
# - TableView
MINIFIED_DESIGNER=$(cat <<-END
~/Development/Evalhalla/static/dist/evalhalla_designer_dist.js \

END
)
MINIFIED_PLAYER=$(cat <<-END
~/Development/Evalhalla/static/dist/evalhalla_player_dist.js \

END
)
MINIFIED_DASHBOARD=$(cat <<-END
~/Development/Evalhalla/static/dist/evalhalla_dashboard_dist.js \

END
)
MINIFIED_TABLEVIEW=$(cat <<-END
~/Development/Evalhalla/static/dist/evalhalla_tableview_dist.js \

END
)
MINIFIED_QRS=$(cat <<-END
~/Development/Evalhalla/static/dist/evalhalla_qrs_dist.js \

END
)
#
#
# Set up our "packages" so we can bundle up the files
# we need for a given part of the evalhalla app
# 
#

##############################################################################
##
## AESIR DASHBOARD JS FILES
##
# <!-- get Evalhalla lib files -->
# <!-- get Evalhalla features -->
# <!-- Evalhalla Core, start it up -->
EVH_AESIRDASHBOARD_PKG=$(cat <<-END
~/Development/Evalhalla/static/lib/v2/evh_g_init.js \
~/Development/Evalhalla/integrations/cortex/cortex-functions.js \
~/Development/Evalhalla/static/lib/v2/evh_g_state.js \
~/Development/Evalhalla/static/lib/v2/evh_g_common.js \
~/Development/Evalhalla/static/lib/v2/evh_cortex_messages.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_query_param_load_cortex.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_instant_dashboard_vasr.js \
~/Development/Evalhalla/static/lib/v2/evh_g_interpreter.js \
~/Development/Evalhalla/static/lib/v2/evh_player_core_aesir_dashboard.js \

END
)

##############################################################################
##
## TABLEVIEW TOOL JS FILES
##
# <!-- Default Survey -->
# <!-- get Evalhalla lib files -->
# <!-- get Evalhalla features -->
# <!-- Evalhalla Core, start it up -->
EVH_TABLEVIEW_PKG=$(cat <<-END
~/Development/Evalhalla/static/lib/v2/evh_g_init.js \
~/Development/Evalhalla/integrations/cortex/cortex-functions.js \
~/Development/Evalhalla/static/sur/example_sur.js \
~/Development/Evalhalla/static/sur/ut1_june18_event.js \
~/Development/Evalhalla/static/sur/ut0_da_interest.js \
~/Development/Evalhalla/static/sur/engage.js \
~/Development/Evalhalla/static/sur/inclusive.js \
~/Development/Evalhalla/static/sur/busrides.js \
~/Development/Evalhalla/static/sur/test_sur.js \
~/Development/Evalhalla/static/sur/ypn.js \
~/Development/Evalhalla/static/sur/dmb.js \
~/Development/Evalhalla/static/sur/dmb2.js \
~/Development/Evalhalla/static/sur/openhouse.js \
~/Development/Evalhalla/static/sur/tsq.js \
~/Development/Evalhalla/static/sur/discover.js \
~/Development/Evalhalla/static/sur/eldp.js \
~/Development/Evalhalla/static/lib/v2/evh_g_common.js \
~/Development/Evalhalla/static/lib/v2/evh_g_state.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_query_param_load_cortex.js \
~/Development/Evalhalla/static/lib/v2/evh_cortex_messages.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_instant_table.js \
~/Development/Evalhalla/static/lib/v2/evh_player_core_tableview.js \

END
)

##############################################################################
##
## EVALHALLA DESIGNER JS FILES
##
# <!-- get Evalhalla init -->
# <!-- API Connection Integrations  -->
# <!-- Default Survey -->
# <!-- Autocomplete values local -->
# <!-- get Evalhalla lib files -->
# <!-- get Evalhalla features -->
# <!-- CORTEX and Data Populator -->
# <!-- get Evalhalla ui -->
# <!-- Evalhalla Core, start it up -->

EVH_DESIGNER_PKG=$(cat <<-END
~/Development/Evalhalla/static/lib/v2/evh_g_init.js \
~/Development/Evalhalla/integrations/registhor/registhor_v2_key.js \
~/Development/Evalhalla/integrations/survista/survista_key.js \
~/Development/Evalhalla/integrations/cortex/cortex-functions.js \
~/Development/Evalhalla/integrations/qrcodejs/qrcode.js \
~/Development/Evalhalla/static/sur/example_sur.js \
~/Development/Evalhalla/static/sur/ut1_june18_event.js \
~/Development/Evalhalla/static/sur/ut0_da_interest.js \
~/Development/Evalhalla/static/sur/engage.js \
~/Development/Evalhalla/static/sur/inclusive.js \
~/Development/Evalhalla/static/sur/busrides.js \
~/Development/Evalhalla/static/sur/test_sur.js \
~/Development/Evalhalla/static/sur/ypn.js \
~/Development/Evalhalla/static/sur/dmb.js \
~/Development/Evalhalla/static/sur/dmb2.js \
~/Development/Evalhalla/static/sur/openhouse.js \
~/Development/Evalhalla/static/sur/tsq.js \
~/Development/Evalhalla/static/sur/discover.js \
~/Development/Evalhalla/static/sur/eldp.js \
~/Development/Evalhalla/static/assets/departments.js \
~/Development/Evalhalla/static/assets/classifications.js \
~/Development/Evalhalla/static/assets/cities.js \
~/Development/Evalhalla/static/assets/languages.js \
~/Development/Evalhalla/static/assets/evalese_md_scripts.js \
~/Development/Evalhalla/static/lib/v2/evh_g_state.js \
~/Development/Evalhalla/static/lib/v2/evh_g_common.js \
~/Development/Evalhalla/static/lib/v2/evh_g_templates.js \
~/Development/Evalhalla/static/lib/v2/evh_g_interpreter.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_query_param_load_cortex.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_language.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_autocomplete.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_tutorial_demo.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_export_json.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_local_storage.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_questionlib.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_unloadconfirmation.js \
~/Development/Evalhalla/static/lib/v2/evh_cortex_messages.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_data_recordpumper.js \
~/Development/Evalhalla/static/lib/v2/evh_player_ui.js \
~/Development/Evalhalla/static/lib/v2/evh_designer_ui.js \
~/Development/Evalhalla/static/lib/v2/evh_designer_core.js \

END
)

##############################################################################
##
## EVALHALLA PLAYER JS FILES
##

# <!-- get Evalhalla init -->
# <!-- API Connection Integrations  -->
# <!-- Default Survey -->
# <!-- Autocomplete values local -->
# <!-- get Evalhalla lib files -->
# <!-- get Evalhalla features -->
# <!-- get Evalhalla ui -->
# <!-- Evalhalla Core, start it up -->
EVH_PLAYER_PKG=$(cat <<-END
~/Development/Evalhalla/static/lib/v2/evh_g_init.js \
~/Development/Evalhalla/integrations/registhor/registhor_v2_key.js \
~/Development/Evalhalla/integrations/survista/survista_key.js \
~/Development/Evalhalla/integrations/cortex/cortex-functions.js \
~/Development/Evalhalla/static/sur/example_sur.js \
~/Development/Evalhalla/static/sur/ut1_june18_event.js \
~/Development/Evalhalla/static/sur/ut0_da_interest.js \
~/Development/Evalhalla/static/sur/engage.js \
~/Development/Evalhalla/static/sur/inclusive.js \
~/Development/Evalhalla/static/sur/busrides.js \
~/Development/Evalhalla/static/sur/test_sur.js \
~/Development/Evalhalla/static/sur/ypn.js \
~/Development/Evalhalla/static/sur/dmb.js \
~/Development/Evalhalla/static/sur/dmb2.js \
~/Development/Evalhalla/static/sur/openhouse.js \
~/Development/Evalhalla/static/sur/tsq.js \
~/Development/Evalhalla/static/sur/discover.js \
~/Development/Evalhalla/static/sur/eldp.js \
~/Development/Evalhalla/static/assets/departments.js \
~/Development/Evalhalla/static/assets/classifications.js \
~/Development/Evalhalla/static/assets/cities.js \
~/Development/Evalhalla/static/assets/languages.js \
~/Development/Evalhalla/static/lib/v2/evh_g_state.js \
~/Development/Evalhalla/static/lib/v2/evh_g_common.js \
~/Development/Evalhalla/static/lib/v2/evh_g_templates.js \
~/Development/Evalhalla/static/lib/v2/evh_g_interpreter.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_query_param_load_cortex.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_language.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_autocomplete.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_local_storage.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_unloadconfirmation.js \
~/Development/Evalhalla/static/lib/v2/evh_cortex_messages.js \
~/Development/Evalhalla/static/lib/v2/evh_player_ui.js \
~/Development/Evalhalla/static/lib/v2/evh_player_core.js \

END
)


##############################################################################
##
## QRS TOOL JS FILES
##
# <!-- Default Survey -->
# <!-- get Evalhalla lib files -->
# <!-- get Evalhalla features -->
# <!-- Evalhalla Core, start it up -->
EVH_QRS_PKG=$(cat <<-END
~/Development/Evalhalla/static/lib/v2/evh_g_init.js \
~/Development/Evalhalla/integrations/cortex/cortex-functions.js \
~/Development/Evalhalla/integrations/qrcodejs/qrcode.js \
~/Development/Evalhalla/static/lib/v2/evh_g_common.js \
~/Development/Evalhalla/static/lib/v2/evh_g_state.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_query_param_load_cortex.js \
~/Development/Evalhalla/static/lib/v2/evh_player_core_qrs.js \

END
)

##############################################################################
##
## PARTIAL PACKAGES FOR BLENDING A BUILD
##

# <!-- get Evalhalla init -->
EVH_INIT=$(cat <<-END
~/Development/Evalhalla/static/lib/v2/evh_g_init.js \

END
)
# <!-- API Connection Integrations  -->
EVH_INTEGRATIONS=$(cat <<-END
~/Development/Evalhalla/integrations/registhor/registhor_v2_key.js \
~/Development/Evalhalla/integrations/survista/survista_key.js \
~/Development/Evalhalla/integrations/cortex/cortex-functions.js \

END
)
# <!-- Default Survey -->
EVH_DEFAULT_SURVEYS=$(cat <<-END
~/Development/Evalhalla/static/sur/example_sur.js \
~/Development/Evalhalla/static/sur/ut1_june18_event.js \
~/Development/Evalhalla/static/sur/ut0_da_interest.js \
~/Development/Evalhalla/static/sur/engage.js \
~/Development/Evalhalla/static/sur/inclusive.js \
~/Development/Evalhalla/static/sur/busrides.js \
~/Development/Evalhalla/static/sur/test_sur.js \
~/Development/Evalhalla/static/sur/ypn.js \
~/Development/Evalhalla/static/sur/dmb.js \
~/Development/Evalhalla/static/sur/dmb2.js \
~/Development/Evalhalla/static/sur/openhouse.js \
~/Development/Evalhalla/static/sur/tsq.js \
~/Development/Evalhalla/static/sur/discover.js \
~/Development/Evalhalla/static/sur/eldp.js \

END
)
# <!-- Autocomplete values local -->
EVH_ASSETS=$(cat <<-END
~/Development/Evalhalla/static/assets/departments.js \
~/Development/Evalhalla/static/assets/classifications.js \
~/Development/Evalhalla/static/assets/cities.js \
~/Development/Evalhalla/static/assets/languages.js \

END
)
# <!-- get Evalhalla lib files -->
EVH_ENGINE=$(cat <<-END
~/Development/Evalhalla/static/lib/v2/evh_g_state.js \
~/Development/Evalhalla/static/lib/v2/evh_g_common.js \
~/Development/Evalhalla/static/lib/v2/evh_g_templates.js \
~/Development/Evalhalla/static/lib/v2/evh_g_interpreter.js \

END
)
# <!-- get Evalhalla features -->
PLAYER_FEATURES=$(cat <<-END
~/Development/Evalhalla/static/lib/v2/evh_feature_query_param_load_cortex.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_language.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_autocomplete.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_local_storage.js \
~/Development/Evalhalla/static/lib/v2/evh_feature_unloadconfirmation.js \
~/Development/Evalhalla/static/lib/v2/evh_cortex_messages.js \

END
)
# <!-- get Evalhalla ui -->
PLAYER_UI=$(cat <<-END
~/Development/Evalhalla/static/lib/v2/evh_player_ui.js \

END
)
# <!-- Evalhalla Core, start it up -->
PLAYER_STARTUP=$(cat <<-END
~/Development/Evalhalla/static/lib/v2/evh_player_core.js \

END
)

##############################################################################
#
#
# SETUP now complete, let's start collecting the parts and 
# compiling them down into something that works in IE11
#
#

# Figure out if we have a particular compile to do
# Set the compile mode
COMPILE_MODE="all"
if [ -z "$1" ]; then
    echo "Request Compile Mode: all"
    COMPILE_MODE="all"
else
    echo "Request Compile Mode: <module>"
    COMPILE_MODE="$1"
fi
# Available compiles
COMPILE_OPTS_ALL="all"
COMPILE_OPTS_PLAYER="player"
COMPILE_OPTS_DESIGNER="designer"
COMPILE_OPTS_DASHBOARD="dashboard"
COMPILE_OPTS_TABLEVIEW="tableview"
COMPILE_OPTS_QRS="qrs"
# Check to see if we're doing what we should, 
# otherwise default compile it
if [ "$COMPILE_MODE" != "$COMPILE_OPTS_ALL" ] && [ "$COMPILE_MODE" != "$COMPILE_OPTS_PLAYER" ] && [ "$COMPILE_MODE" != "$COMPILE_OPTS_DESIGNER" ] && [ "$COMPILE_MODE" != "$COMPILE_OPTS_DASHBOARD" ] && [ "$COMPILE_MODE" != "$COMPILE_OPTS_TABLEVIEW" ]  && [ "$COMPILE_MODE" != "$COMPILE_OPTS_QRS" ] ; then
    COMPILE_MODE="all"
fi
echo "Compile Mode Set: $COMPILE_MODE"

##############################################################################
# Our actual compile function, 
# calls the jar does the work
evhcompile () {
    # $1 = $COMBINED
    echo -e "\n-- COMPILE!\n-- Using $1"
    # Trigger the actual compile here
    eval java -jar $CMP_JAR --js $1 --js_output_file $MINIFIED --warning_level QUIET
    # --warning_level DEFAULT|VERBOSE
}
# Our Module Compilers
evhcompile_player () {
    MODULE="<player>"
    if [ "$COMPILE_MODE" == "$COMPILE_OPTS_PLAYER" ] || [ "$COMPILE_MODE" == "$COMPILE_OPTS_ALL" ]; then
        echo -e "\nCompiling $MODULE... Start"
        # Actual JS files to include in the compile. Order matters.
        #COMBINED="$EVH_INIT $EVH_INTEGRATIONS $EVH_DEFAULT_SURVEYS $EVH_ASSETS $EVH_ENGINE $PLAYER_FEATURES $PLAYER_UI $PLAYER_STARTUP"
        COMBINED="$EVH_PLAYER_PKG"
        MINIFIED="$MINIFIED_PLAYER"
        evhcompile "$COMBINED"
        echo -e "Compiling $MODULE... Done!\n"
    fi
}
evhcompile_designer () {
    MODULE="<designer>"
    if [ "$COMPILE_MODE" == "$COMPILE_OPTS_DESIGNER" ] || [ "$COMPILE_MODE" == "$COMPILE_OPTS_ALL" ]; then
        echo -e "\nCompiling $MODULE... Start"
        COMBINED="$EVH_DESIGNER_PKG"
        MINIFIED="$MINIFIED_DESIGNER"
        evhcompile "$COMBINED"
        echo -e "Compiling $MODULE... Done!\n"
    fi
}
evhcompile_dashboard () {
    MODULE="<dashboard>"
    if [ "$COMPILE_MODE" == "$COMPILE_OPTS_DASHBOARD" ] || [ "$COMPILE_MODE" == "$COMPILE_OPTS_ALL" ]; then
        echo -e "\nCompiling $MODULE... Start"
        COMBINED="$EVH_AESIRDASHBOARD_PKG"
        MINIFIED="$MINIFIED_DASHBOARD"
        evhcompile "$COMBINED"
        echo -e "Compiling $MODULE... Done!\n"
    fi
}
evhcompile_tableview () {
    MODULE="<tableview>"
    if [ "$COMPILE_MODE" == "$COMPILE_OPTS_TABLEVIEW" ] || [ "$COMPILE_MODE" == "$COMPILE_OPTS_ALL" ]; then
        echo -e "\nCompiling $MODULE... Start"
        COMBINED="$EVH_TABLEVIEW_PKG"
        MINIFIED="$MINIFIED_TABLEVIEW"
        evhcompile "$COMBINED"
        echo -e "Compiling $MODULE... Done!\n"
    fi
}
evhcompile_qrs () {
    MODULE="<qrs>"
    if [ "$COMPILE_MODE" == "$COMPILE_OPTS_QRS" ] || [ "$COMPILE_MODE" == "$COMPILE_OPTS_ALL" ]; then
        echo -e "\nCompiling $MODULE... Start"
        COMBINED="$EVH_QRS_PKG"
        MINIFIED="$MINIFIED_QRS"
        evhcompile "$COMBINED"
        echo -e "Compiling $MODULE... Done!\n"
    fi
}

##############################################################################
# Let's figure out what to use
COMBINED=""
# Trigger compiles
if [ "$COMPILE_MODE" == "$COMPILE_OPTS_ALL" ]; then
    echo "Compiling <all>... Start"
    evhcompile_player
    evhcompile_designer
    evhcompile_dashboard
    evhcompile_tableview
    evhcompile_qrs
    echo "Compiling <all>... Done!"
fi
if [ "$COMPILE_MODE" == "$COMPILE_OPTS_PLAYER" ]; then
    evhcompile_player
fi
if [ "$COMPILE_MODE" == "$COMPILE_OPTS_DESIGNER" ]; then
    evhcompile_designer
fi
if [ "$COMPILE_MODE" == "$COMPILE_OPTS_DASHBOARD" ]; then
    evhcompile_dashboard
fi
if [ "$COMPILE_MODE" == "$COMPILE_OPTS_TABLEVIEW" ]; then
    evhcompile_tableview
fi
if [ "$COMPILE_MODE" == "$COMPILE_OPTS_QRS" ]; then
    evhcompile_qrs
fi

echo -e "\n> Compilation complete!"
