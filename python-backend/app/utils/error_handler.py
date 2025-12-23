# Error Handler Layer
from flask import jsonify
from werkzeug.exceptions import HTTPException


def register_error_handlers(app):
    """
    Register centralized error handlers for the application
    """
    
    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        """Handle HTTP exceptions"""
        response = {
            'error': e.description,
            'status': e.code
        }
        return jsonify(response), e.code
    
    @app.errorhandler(ValueError)
    def handle_value_error(e):
        """Handle ValueError exceptions (business logic errors)"""
        return jsonify({'error': str(e)}), 400
    
    @app.errorhandler(Exception)
    def handle_generic_exception(e):
        """Handle all other exceptions"""
        app.logger.error(f'Unhandled exception: {str(e)}', exc_info=True)
        
        # Don't expose internal error details in production
        if app.config.get('DEBUG'):
            return jsonify({
                'error': str(e),
                'type': type(e).__name__
            }), 500
        else:
            return jsonify({'error': 'Internal server error'}), 500
    
    @app.errorhandler(404)
    def handle_not_found(e):
        """Handle 404 Not Found"""
        return jsonify({'error': 'Resource not found'}), 404
    
    @app.errorhandler(405)
    def handle_method_not_allowed(e):
        """Handle 405 Method Not Allowed"""
        return jsonify({'error': 'Method not allowed'}), 405
